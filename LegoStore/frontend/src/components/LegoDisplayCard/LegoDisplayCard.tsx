import { FC } from "react";
import { Lego } from "../../utils/types";
import { useUser } from "../../context/User";

interface LegoDisplayCardProps {
  lego: Lego;
  onDeleteSet: (id: number) => void;
  onAddToCart: (id: number)=> void;
}

export const LegoDisplayCard: FC<LegoDisplayCardProps> = ({ lego , onDeleteSet, onAddToCart}) => {
  const { user } = useUser();
  console.log(lego);
  console.log(lego.legoId);

  return (
    <div
      className="card m-3 p-2"
      style={{
        width: 200,
        backgroundColor: "#FFEDF4",
        border: "3px solid #ffcce1",
      }}
    >
      <img
        className="card-img-top"
        src="..."
        style={{ width: 180, height: 180, borderRadius: 10 }}
      ></img>
      <div className="card-body">
        <h5 className="card-title">{lego.name}</h5>
        <p className="card-text">{lego.description}</p>
        <p className="card-text">{lego.price}$</p>
        <div className="row">
          {user && (
            <a href="#" className="btn" style={{ backgroundColor: "#ffcce1" }} onClick={() => onAddToCart(lego.legoId)}>
              add to cart
            </a>
          )}
          {user?.role == "admin" && (
            <button className="btn" style={{ backgroundColor: "#ffcce1" }} onClick={() => onDeleteSet(lego.legoId)}>
              <i className="bi bi-trash"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
