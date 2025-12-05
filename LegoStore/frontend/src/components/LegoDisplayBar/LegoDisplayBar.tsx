import { FC } from "react";
import { Lego } from "../../utils/types";
import { LegoDisplayCard } from "../LegoDisplayCard";

interface LegoDisplayBarProps {
  legos: Lego[];
  onDeleteSet: (id: number)=>void
}

export const LegoDisplayBar: FC<LegoDisplayBarProps> = ({ legos, onDeleteSet }) => {


  return (
    <div className="d-flex">
      {legos.map((item) => (
        <LegoDisplayCard key={item.id} lego={item} onDeleteSet={onDeleteSet} />
      ))}
    </div>
  );
};
