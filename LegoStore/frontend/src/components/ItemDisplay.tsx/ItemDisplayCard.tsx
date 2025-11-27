import { FC } from "react";

export const ItemDisplayCard: FC = () => {
  return (
    <div className="card" style={{ width: 18 }}>
      <img className="card-img-top" src="..." alt="Card image cap"></img>
      <div className="card-body" style={{backgroundColor: "FFEDF4"}}>
        <h5 className="card-title">Lego name</h5>
        <p className="card-text">
         lego description
        </p>
        <a href="#" className="btn btn-primary">
          add to cart
        </a>
      </div>
    </div>
  );
};
