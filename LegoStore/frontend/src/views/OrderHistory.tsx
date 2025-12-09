import { useEffect, useState } from "react";
import { useUser } from "../context/User";
import { useNavigate } from "react-router-dom";
import { Order } from "../utils/types";
import api from "../api";
import { OrderHistoryItem } from "../components/OrderHistoryItem/OrderHistoryItem";
import toast from "react-hot-toast";

export const OrderHistory = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) {
      console.log("user is null");
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await api.orders().getOrders();
        setOrders(res.data);
      } catch (e) {
        toast.error("error getting orders");
      }
    };

    getOrders();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className=" position-relative  " style={{ width: 1700 }}>
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
