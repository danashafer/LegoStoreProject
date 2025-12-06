import { useEffect, useState } from "react";
import { useUser } from "../context/User";
import { useNavigate } from "react-router-dom";
import { Lego, Order } from "../utils/types";
import api from "../api";
import { CartItem } from "../components/CartItem";
import { OrderHistoryItem } from "../components/OrderHistoryItem/OrderHistoryItem";

export const OrderHistory = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  //   const handleDeleteLegoFromCart = async (legoToDeleteId: number) => {
  //     await api.carts().deleteLegoFromCart(legoToDeleteId);
  //     setLegosInCart((prev) =>
  //       prev.filter((lego) => lego.legoId !== legoToDeleteId)
  //     );
  //   };

  useEffect(() => {
    if (!user) {
      console.log("user is null");
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const getOrders = async () => {
      const res = await api.orders().getOrders();

      setOrders(res.data);
      console.log(orders);
    };

    getOrders();
  }, []);

  console.log(orders);
  console.log(localStorage.getItem("token"));

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="m-3 position-relative  " style={{ width: 2000 }}>
          <img
            src=".././assets/images/backgroundLegoBig.png"
            alt=""
            className="w-100"
          />
          <div
            className="position-absolute top-50 start-50 translate-middle bg-light rounded w-75 h-75 p-3"
            style={{ overflowY: "auto" }}
          >
            <h1>Order History</h1>

            {orders.map((item) => (
              <OrderHistoryItem key={item.orderId} order={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
