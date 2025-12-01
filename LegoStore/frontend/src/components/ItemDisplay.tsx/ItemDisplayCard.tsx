import { FC } from "react";

export const ItemDisplayCard: FC = () => {
  return (
    <div className="card m-3 p-2" style={{ width: 200, backgroundColor: "#FFEDF4", border: "3px solid #ffcce1"}}>
      <img className="card-img-top" src="..." style={{width: 180 , height: 180, borderRadius:10}}></img>
      <div className="card-body">
        <h5 className="card-title">Lego name</h5>
        <p className="card-text">lego description</p>
        <a href="#" className="btn" style= {{backgroundColor: "#ffcce1"}}>
          add to cart
        </a>
      </div>
 
    </div>
  );
};
