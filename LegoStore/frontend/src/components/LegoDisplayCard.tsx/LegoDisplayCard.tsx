import { FC } from "react";
import { Lego } from "../../utils/types";

interface LegoDisplayCardProps {
  lego: Lego;
}

export const LegoDisplayCard: FC<LegoDisplayCardProps> = ({lego}) => {
  return (
    <div className="card m-3 p-2" style={{ width: 200, backgroundColor: "#FFEDF4", border: "3px solid #ffcce1"}}>
      <img className="card-img-top" src="..." style={{width: 180 , height: 180, borderRadius:10}}></img>
      <div className="card-body">
        <h5 className="card-title">{lego.name}</h5>
        <p className="card-text">{lego.description}</p>
        <p className="card-text">{lego.price}</p>
        <a href="#" className="btn" style= {{backgroundColor: "#ffcce1"}}>
          add to cart
        </a>
      </div>
 
    </div>
  );
};
