import { LegoDisplayCard } from "../components/LegoDisplayCard.tsx/index.ts"
import api from "../api/index.ts"
import { useEffect, useState } from "react";
import { Lego } from "../utils/types.ts";

export const Home =() => {

      const [lego, setLego] = useState<Lego[]>([]);


    useEffect(()=> {
        const getLegosForDisplay = async() => {
            setLego((await api.legos().getAll()).data)
        }

        getLegosForDisplay();
    },[])

    return (
        <>
        <img className="p-3" src=".././assets/images/legoStoreSale.png"  height="300"></img>

        <h1> items </h1>
        {lego.map((item) => (
        <LegoDisplayCard key={item.id} lego={item} />
      ))}
        
        </>
    )
}