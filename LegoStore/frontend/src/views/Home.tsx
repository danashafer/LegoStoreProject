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
      {isFormOpen && <NewLegoForm onClose={() => setIsFormOpen(false)} />}
      <LegoDisplayBar legos={legos} />
    </>
  );
};
