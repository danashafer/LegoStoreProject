import { LegoDisplayCard } from "../components/LegoDisplayCard.tsx/index.ts"

export const Home =() => {
    return (
        <>
        <img className="p-3" src=".././assets/images/legoStoreSale.png"  height="300"></img>

        <h1> items </h1>
        <LegoDisplayCard></LegoDisplayCard>
        </>
    )
}