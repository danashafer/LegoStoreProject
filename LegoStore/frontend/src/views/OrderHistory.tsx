import { useEffect, useState } from "react";
import { useUser } from "../context/User";
import { useNavigate } from "react-router-dom";
import { Lego } from "../utils/types";
import api from "../api";
import { CartItem } from "../components/CartItem";

export const OrderHistory = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [legosInCart, setLegosInCart] = useState<Lego[]>([]);

  const handleDeleteLegoFromCart = async (legoToDeleteId: number) => {
    await api.carts().deleteLegoFromCart(legoToDeleteId);
    setLegosInCart((prev) =>
      prev.filter((lego) => lego.legoId !== legoToDeleteId)
    );
  };

  useEffect(() => {
    if (!user) {
      console.log("user is null");
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const getLegosInCart = async () => {
      console.log(user?.userId);
      const res = await api.carts().getUserCart();

      setLegosInCart(res.data);
      console.log(legosInCart);
    };

    getLegosInCart();
  }, []);

  console.log(legosInCart);
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
          <div className="position-absolute top-50 start-50 translate-middle bg-light rounded w-75 h-75 p-3">
            <h1> Order History</h1>
            <div>
              {legosInCart.map((item) => (
                <CartItem
                  key={item.legoId}
                  lego={item}
                  onDeleteLego={handleDeleteLegoFromCart}
                />
              ))}
            </div>

            <button className="btn" style={{ backgroundColor: "#ffcce1" }}>
              place order
            </button>
          </div>
        </div>
      </div>
    </>
    // <h1> this is the cart page </h1>
  );
};
