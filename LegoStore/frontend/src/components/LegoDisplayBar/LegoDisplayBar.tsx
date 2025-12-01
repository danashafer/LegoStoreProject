import { FC } from "react";
import { Lego } from "../../utils/types";
import { LegoDisplayCard } from "../LegoDisplayCard";

interface LegoDisplayBarProps {
  legos: Lego[];
}

export const LegoDisplayBar: FC<LegoDisplayBarProps> = ({legos}) => {
  return (
    <div className="d-flex">
        {legos.map((item) => (
        <LegoDisplayCard key={item.id} lego={item} />
      ))}

    </div>

    

    
  );
};

