import api from "../api/index.ts";
import { useEffect, useState } from "react";
import { Lego } from "../utils/types.ts";
import { LegoDisplayBar } from "../components/LegoDisplayBar/LegoDisplayBar.tsx";
import { useUser } from "../context/User/useUser.ts";

export const Home = () => {
  const [legos, setLegos] = useState<Lego[]>([]);
  const {user} = useUser();

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
      {user?.role == "admin" && <button className="btn btn-secondary">add new lego</button>}

      <LegoDisplayBar legos={legos} />
    </>
  );
};
