import { useEffect, useState } from "react";
import api from "../api";
import { Order, OrderStatus } from "../utils/types";
import { OrderHistoryItem } from "../components/OrderHistoryItem/OrderHistoryItem";
import toast from "react-hot-toast";

export const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.orders().getAllOrders();
        setOrders(res.data);
      } catch (e) {
        toast.error("failed load orders");
      }
    };

    load();
  }, []);

  const handleChangeStatus = async (
    orderId: number,
    newStatus: OrderStatus
  ) => {
    console.log(newStatus);
    try {
      await api.orders().changeStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((order) =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success("status changed");
    } catch (e) {
      toast.error("failed to change status");
    }
  };

  return (
    <div className="p-4">
      <h2>All orders</h2>

      {orders.map((order) => (
        <div key={order.orderId} className="mb-3">
          <OrderHistoryItem
            order={order}
            canEditStatus={true}
            onChangeStatus={handleChangeStatus}
          />
        </div>
      ))}
    </div>
  );
};
