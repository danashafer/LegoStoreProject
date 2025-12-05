import { FC } from "react";
import { Lego } from "../../utils/types";
import { useUser } from "../../context/User";

interface CartItemProps {
  lego: Lego;
  onDeleteSet: (id: number) => void;
}

export const CartItem: FC<CartItemProps> = ({
  lego,
  onDeleteSet,
}) => {
  const { user } = useUser();
  console.log(lego);
  console.log(lego.legoId);

  return (
    <div
      className="d-flex align-items-center justify-content-between p-3 mb-3"
      style={{
        backgroundColor: "#FFE6ED",
        borderRadius: "12px",
        width: "100%",
      }}
    >
      {/* Thumbnail */}
      <img
        src={lego.imageUrl || "https://via.placeholder.com/70"}
        alt={lego.name}
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "8px",
          objectFit: "cover",
          marginRight: "16px",
        }}
      />

      {/* Name + description */}
      <div style={{ flex: 1 }}>
        <h5 style={{ margin: 0, fontWeight: 600 }}>{lego.name}</h5>
        <p style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>
          {lego.description}
        </p>
      </div>

      {/* Quantity controls */}
      <div
        className="d-flex align-items-center"
        style={{
          backgroundColor: "#E7B7FF",
          padding: "4px 10px",
          borderRadius: "12px",
          marginRight: "16px",
        }}
      >
        <button
          className="btn btn-sm"
          style={{ padding: "0 6px" }}
        //   onClick={onDecrease}
        >
          -
        </button>

        {/* <span style={{ padding: "0 8px" }}>{quantity}</span> */}

        <button
          className="btn btn-sm"
          style={{ padding: "0 6px" }}
        //   onClick={onIncrease}
        >
          +
        </button>
      </div>

      {/* Trash icon */}
      <button
        className="btn"
        style={{ marginRight: "16px" }}
        // onClick={() => onDelete(lego.id)}
      >
        <i className="bi bi-trash" style={{ fontSize: "18px" }}></i>
      </button>

      {/* Price */}
      <div style={{ fontWeight: 600 }}>{lego.price}$</div>
    </div>

    // <div
    //   className="card m-3 p-2"
    //   style={{
    //     width: 1000,
    //     border: "3px solid #ffcce1",
    //   }}
    // >
    //   <img
    //     className="card-img-"
    //     src="..."
    //     style={{ width: 180, height: 180, borderRadius: 10 }}
    //   ></img>
    //   <div className="card-body">
    //     <h5 className="card-title">{lego.name}</h5>
    //     <p className="card-text">{lego.description}</p>
    //     <p className="card-text">{lego.price}</p>
    //     <div className="row">
    //       {user && (
    //         <a href="#" className="btn" style={{ backgroundColor: "#ffcce1" }}>
    //           add to cart
    //         </a>
    //       )}
    //       {user?.role == "admin" && (
    //         <button className="btn" style={{ backgroundColor: "#ffcce1" }} onClick={() => onDeleteSet(lego.legoId)}>
    //           <i className="bi bi-trash"></i>
    //         </button>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};
