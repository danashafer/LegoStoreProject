import { useEffect, useState } from "react";
import { useUser } from "../context/User";
import { useNavigate } from "react-router-dom";
import { CartItemType, Lego } from "../utils/types";
import api from "../api";
import { CartItem } from "../components/CartItem";

export const Cart = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [itemsInCart, setItemsInCart] = useState<CartItemType[]>([]);

  const handleDeleteLegoFromCart = async (legoToDeleteId: number) => {
    await api.carts().deleteLegoFromCart(legoToDeleteId);
    setItemsInCart((prev) =>
      prev.filter((item) => item.lego.legoId !== legoToDeleteId)
    );
  };

  const handlePlaceOrder = async () => {
    await api.orders().placeOrder();
    setItemsInCart([]);
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

      setItemsInCart(res.data);
      console.log("the items in cart are :");
      console.log(itemsInCart);
    };

    getLegosInCart();
  }, []);

  const handleIncrease = async (legoId: number) => {
    const res = await api.carts().addLegoToCart(legoId, 1);
    setItemsInCart(res.data);
  };

  const handleDecrease = async (legoId: number) => {
    const res = await api.carts().decrementLegoFromCart(legoId);
    setItemsInCart(res.data);
  };

  console.log(itemsInCart);
  console.log(localStorage.getItem("token"));

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className=" position-relative  " style={{ width: 1700}}>
          <img
            src=".././assets/images/backgroundLegoBig.png"
            alt=""
            className="w-100"
          />
          <div
            className="position-absolute top-50 start-50 translate-middle bg-light rounded w-75 h-75 p-3"
            style={{ overflowY: "auto" }}
          >
            <h1> your cart</h1>
            {itemsInCart.length == 0 && <div>your cart is empty</div>}
            {itemsInCart.length > 0 && (
              <div>
                {" "}
                <div>
                  {itemsInCart.map((item) => (
                    <CartItem
                      key={item.lego.legoId}
                      item={item}
                      onDeleteLego={handleDeleteLegoFromCart}
                      onIncrease={handleIncrease}
                      onDecrease={handleDecrease}
                    />
                  ))}
                </div>
                <button
                  className="btn"
                  style={{ backgroundColor: "#ffcce1" }}
                  onClick={handlePlaceOrder}
                >
                  place order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
    // <h1> this is the cart page </h1>
  );
};
