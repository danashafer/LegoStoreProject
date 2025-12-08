import { FC } from "react";
import { CartItemType, Lego } from "../../utils/types";
import { useUser } from "../../context/User";

interface CartItemProps {
  item: CartItemType;
  onDeleteLego: (id: number) => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
}

export const CartItem: FC<CartItemProps> = ({
  item,
  onDeleteLego,
  onIncrease,
  onDecrease,
}) => {
  // const { user } = useUser();
  console.log(item);
  console.log(item.lego.legoId);

  const imageUrl = `https://lego-store-assets.s3.eu-north-1.amazonaws.com/${item.lego.imageKey}`;

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
        src={imageUrl || "https://via.placeholder.com/70"}
        alt={item.lego.name}
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
        <h5 style={{ margin: 0, fontWeight: 600 }}>{item.lego.name}</h5>
        <p style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>
          {item.lego.description}
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
          onClick={() => onDecrease(item.lego.legoId)}
        >
          -
        </button>

        <span style={{ padding: "0 8px" }}>{item.amount}</span>

        <button
          className="btn btn-sm"
          style={{ padding: "0 6px" }}
          onClick={() => onIncrease(item.lego.legoId)}
        >
          +
        </button>
      </div>

      {/* Trash icon */}
      <button
        className="btn"
        style={{ marginRight: "16px" }}
        onClick={() => onDeleteLego(item.lego.legoId)}
      >
        <i className="bi bi-trash" style={{ fontSize: "18px" }}></i>
      </button>

      {/* Price */}
      <div style={{ fontWeight: 600 }}>{item.lego.price * item.amount}$</div>
    </div>
  );
};
