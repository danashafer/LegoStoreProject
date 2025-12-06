import { FC, useState } from "react";
import { Order } from "../../utils/types";

interface OrderHistoryItem {
  order: Order;
}

export const OrderHistoryItem: FC<OrderHistoryItem> = ({ order }) => {
  console.log(order);
  console.log(order.orderId);
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(prev => !prev)

  return (
    <div
      className="d-flex flex-column p-3 mb-3"
      style={{
        backgroundColor: "#FFE6ED",
        borderRadius: "12px",
        width: "100%",
        border: "2px solid #FFCCD7",
      }}
    >
      {/* Top row: Order number + Date */}
      <div className="d-flex justify-content-between mb-2">
        <h5 style={{ margin: 0, fontWeight: 700 }}>Order #{order.orderId}</h5>

        <span style={{ fontWeight: 600, color: "#555" }}>
          {new Date(order.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Middle row: Status */}
      <div className="mb-2">
        <span style={{ fontWeight: 600 }}>Status:</span>
        <span style={{ marginLeft: 6 }}>{order.status}</span>
      </div>

      {/* Bottom row: Price */}
      <div
        className="d-flex justify-content-end"
        style={{ fontSize: "1.1rem", fontWeight: 700 }}
      >
        Total: {order.totalPrice}$
      </div>

      {/* toggle button */}
      <div className="mt-3 d-flex justify-content-between align-items-center">
        <button
          type="button"
          className="btn btn-sm"
          style={{
            backgroundColor: "#FFCCD7",
            borderRadius: "999px",
            fontWeight: 500,
          }}
          onClick={toggleOpen}
        >
          {isOpen ? "Hide items" : "View items"}
          <i
            className={`ms-2 bi ${
              isOpen ? "bi-chevron-up" : "bi-chevron-down"
            }`}
          />
        </button>
      </div>

      {/* dropdown items */}
      {isOpen && (
        <div
          className="mt-3"
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "10px 12px",
          }}
        >
          {order.items.map((item) => (
            <div
              key={item.orderItemId}
              className="d-flex justify-content-between align-items-center mb-2"
            >
              <div>
                <div style={{ fontWeight: 600 }}>{item.lego.name}</div>
                <div style={{ fontSize: "0.9rem", color: "#666" }}>
                  {item.quantity} x {item.lego.price}$
                </div>
              </div>

              <div style={{ fontWeight: 600 }}>
                {Number(item.lego.price) * item.quantity}$
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
