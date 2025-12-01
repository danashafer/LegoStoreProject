import { ItemDisplayCard } from "../components/ItemDisplay.tsx"

export const Home =() => {
    return (
        <>
        <img className="p-3" src=".././assets/images/legoStoreSale.png"  height="300"></img>

        <h1> items </h1>
        <ItemDisplayCard></ItemDisplayCard>
        </>
    )
}