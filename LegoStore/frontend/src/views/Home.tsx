
import api from "../api/index.ts"
import { useEffect, useState } from "react";
import { Lego } from "../utils/types.ts";
import { LegoDisplayBar } from "../components/LegoDisplayBar/LegoDisplayBar.tsx";

export const Home =() => {

      const [legos, setLegos] = useState<Lego[]>([]);


    useEffect(()=> {
        const getLegosForDisplay = async() => {
            setLegos((await api.legos().getAll()).data)
        }

        getLegosForDisplay();
    },[])

    return (
        <>
        <img className="p-3" src=".././assets/images/legoStoreSale.png"  height="300"></img>

        <h1> items </h1>
        <LegoDisplayBar legos={legos}/>
        
        
        </>
    )
}