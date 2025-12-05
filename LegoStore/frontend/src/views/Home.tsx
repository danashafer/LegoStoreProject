import api from "../api/index.ts";
import { useEffect, useState } from "react";
import { Lego } from "../utils/types.ts";
import { LegoDisplayBar } from "../components/LegoDisplayBar/LegoDisplayBar.tsx";
import { useUser } from "../context/User/useUser.ts";
import { NewLegoForm } from "../components/NewLegoForm/NewLegoForm.tsx";

export const Home = () => {
  const [legos, setLegos] = useState<Lego[]>([]);
  const { user } = useUser();
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const getLegosForDisplay = async () => {
      setLegos((await api.legos().getAll()).data);
    };

    getLegosForDisplay();
  }, []);

  const handleAddNewLego = async (newLego: Lego) => {
    console.log("adding lego set in home");
    const response = await api.legos().addNewLego(newLego);

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

  return (
    <>
      <img
        className="p-3"
        src=".././assets/images/legoStoreSale.png"
        height="300"
      ></img>

      <h1> items </h1>
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
        legos={legos}
        onDeleteSet={handleDeleteLego}
        onAddToCart={handleAddLegoToCart}
      />
    </>
  );
};
