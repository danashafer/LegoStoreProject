import { FC } from "react";
import { Lego } from "../../utils/types";
import { LegoDisplayCard } from "../LegoDisplayCard";

interface LegoDisplayBarProps {
  legos: Lego[];
  onDeleteSet: (id: number)=>void;
  onAddToCart: (id: number)=> void;
}

export const LegoDisplayBar: FC<LegoDisplayBarProps> = ({ legos, onDeleteSet, onAddToCart }) => {


  return (
    <div className="d-flex">
      {legos.map((item) => (
        <LegoDisplayCard key={item.legoId} lego={item} onDeleteSet={onDeleteSet} onAddToCart={onAddToCart}  />
      ))}
    </div>
  );
};
