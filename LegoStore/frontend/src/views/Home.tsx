import api from "../api/index.ts";
import { useEffect, useState } from "react";
import { Lego, NewLegoFormData } from "../utils/types.ts";
import { LegoDisplayBar } from "../components/LegoDisplayBar/LegoDisplayBar.tsx";
import { useUser } from "../context/User/useUser.ts";
import { NewLegoForm } from "../components/NewLegoForm/NewLegoForm.tsx";
import { v4 as uuidv4 } from "uuid";

export const Home = () => {
  const [legos, setLegos] = useState<Lego[]>([]);
  const { user } = useUser();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filteredLegos, setFilteredLegos] = useState(legos);

  useEffect(() => {
    const getLegosForDisplay = async () => {
      const res = (await api.legos().getAll()).data
      setLegos(res);
      setFilteredLegos(res);
      console.log(filteredLegos);
    };

    getLegosForDisplay();
  }, []);

  const handleAddNewLego = async (newLego: NewLegoFormData) => {
    console.log("adding lego set in home");
    if (!newLego.file) {
      alert("Select an image first");
      return;
    }

    const legoId = uuidv4();
    const fileName = newLego.file.name;
    const fileType = newLego.file.type || "image/png";

    const uploadInfo = await api
      .upload()
      .getLegoImageUploadUrl(legoId, fileName, fileType);
    // const response = await api.legos().addNewLego(newLego);

    const uploadRes = await fetch(uploadInfo.data.uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": fileType || "image/png",
      },
      body: newLego.file,
    });

    if (!uploadRes.ok) {
      throw new Error("Upload to S3 failed");
    }

    const response = await api.legos().addNewLego({
      name: newLego.name,
      description: newLego.description,
      price: newLego.price,
      imageKey: uploadInfo.data.key,
    });

    setLegos((prev) => [...prev, response.data]);
  };

  const handleDeleteLego = async (legoToDeleteId: number) => {
    console.log("deleting lego " + legoToDeleteId);

    await api.legos().deleteLego(legoToDeleteId);

    setLegos((prev) => prev.filter((lego) => lego.legoId !== legoToDeleteId));
  };

  const handleAddLegoToCart = async (legoToAddId: number) => {
    await api.carts().addLegoToCart(legoToAddId);
  };

  const handleSearch = (searchedInput: string) => {
    console.log("searching");
    console.log(searchedInput);
    setFilteredLegos(
      legos.filter((lego) => {
        const text = `${lego.name} ${lego.description}`.toLowerCase();
        return text.includes(searchedInput);
      })
    );
  };
  return (
    <>
      <img
        className="p-3"
        src=".././assets/images/legoStoreSale.png"
        height="300"
      ></img>

      {/* <h1> items </h1> */}
      <div className="d-flex justify-content-center m-3">
        <form className="form-inline">
          <input
            className="form-control mr-sm-2 rounded"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{ width: 300, borderColor: "#D7EEFF", borderWidth: "5px" }}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button> */}
        </form>
      </div>

      {user?.role === "admin" && (
        <button
          className="btn btn-secondary"
          onClick={() => setIsFormOpen(true)}
        >
          add new lego
        </button>
      )}
      {isFormOpen && (
        <NewLegoForm
          onClose={() => setIsFormOpen(false)}
          onSubmitAddNewSet={handleAddNewLego}
        />
      )}
      <LegoDisplayBar
        legos={filteredLegos}
        onDeleteSet={handleDeleteLego}
        onAddToCart={handleAddLegoToCart}
      />
    </>
  );
};
