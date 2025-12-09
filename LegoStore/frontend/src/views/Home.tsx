import api from "../api/index.ts";
import { useEffect, useState } from "react";
import { Lego, NewLegoFormData } from "../utils/types.ts";
import { LegoDisplayBar } from "../components/LegoDisplayBar/LegoDisplayBar.tsx";
import { useUser } from "../context/User/useUser.ts";
import { NewLegoForm } from "../components/NewLegoForm/NewLegoForm.tsx";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

export const Home = () => {
  const [legos, setLegos] = useState<Lego[]>([]);
  const { user } = useUser();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filteredLegos, setFilteredLegos] = useState(legos);

  useEffect(() => {
    const getLegosForDisplay = async () => {
      try {
        const res = (await api.legos().getAll()).data;
        setLegos(res);
        setFilteredLegos(res);
      } catch (e) {
        toast.error("error loading legos in store");
      }
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

    const uploadRes = await fetch(uploadInfo.data.uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": fileType || "image/png",
      },
      body: newLego.file,
    });

    if (!uploadRes.ok) {
      toast.error("image upload failed");
      throw new Error("Upload to S3 failed");
    }

    try {
      const response = await api.legos().addNewLego({
        name: newLego.name,
        description: newLego.description,
        price: newLego.price,
        amount: newLego.amount,
        imageKey: uploadInfo.data.key,
      });

      setLegos((prev) => [...prev, response.data]);
      setFilteredLegos((prev) => [...prev, response.data]);
      toast.success("new lego added");
    } catch (e) {
      toast.error("adding new lego failed");
    }
  };

  const handleDeleteLego = async (legoToDeleteId: number) => {
    console.log("deleting lego " + legoToDeleteId);

    try {
      await api.legos().deleteLego(legoToDeleteId);

      setLegos((prev) => prev.filter((lego) => lego.legoId !== legoToDeleteId));
      setFilteredLegos((prev) =>
        prev.filter((lego) => lego.legoId !== legoToDeleteId)
      );
      toast.success("lego deleted");
    } catch (e) {
      toast.error("error deleting lego");
    }
  };

  const handleAddLegoToCart = async (legoToAddId: number) => {
    try {
      await api.carts().addLegoToCart(legoToAddId, 1);
      toast.success("item added to cart");
    } catch (e) {
      toast.error("error adding to cart");
    }
  };

  const handleSearch = (searchedInput: string) => {
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
