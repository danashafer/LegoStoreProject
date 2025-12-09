import { useEffect, useState } from "react";
import { useUser } from "../context/User";
import { useNavigate } from "react-router-dom";
import { CartItemType } from "../utils/types";
import api from "../api";
import { CartItem } from "../components/CartItem";
import toast from "react-hot-toast";

export const Cart = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [itemsInCart, setItemsInCart] = useState<CartItemType[]>([]);

  const handleDeleteLegoFromCart = async (legoToDeleteId: number) => {
    try {
      await api.carts().deleteLegoFromCart(legoToDeleteId);
      setItemsInCart((prev) =>
        prev.filter((item) => item.lego.legoId !== legoToDeleteId)
      );
    } catch (e) {
      toast.error("error deleting lego from cart");
    }
  };

  const handlePlaceOrder = async () => {
    try {
      await api.orders().placeOrder();
      setItemsInCart([]);
      toast.success("order placed");
    } catch (e) {
      toast.error("error placing order");
    }
  };

  useEffect(() => {
    if (!user) {
      console.log("user is null");
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const getLegosInCart = async () => {
      try {
        const res = await api.carts().getUserCart();
        setItemsInCart(res.data);
      } catch (e) {
        toast.error("error getting items for cart");
      }
    };

    getLegosInCart();
  }, []);

  //calculating cart total each time page rerenders - cartItems change
  const cartTotal = itemsInCart.reduce((sum, item) => {
    return sum + Number(item.amount) * Number(item.lego.price);
  }, 0);

  const handleIncrease = async (legoId: number) => {
    try {
      const res = await api.carts().addLegoToCart(legoId, 1);
      setItemsInCart(res.data);
    } catch (e: any) {
      if (e.response.status == 400) {
        toast.error("not enough stock");
      } else {
        toast.error("error increasing item");
      }
    }
  };

  const handleDecrease = async (legoId: number) => {
    try {
      const res = await api.carts().decrementLegoFromCart(legoId);
      setItemsInCart(res.data);
    } catch (e) {
      toast.error("error decreasing item");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className=" position-relative" style={{ width: 1700 }}>
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
                <div>
                  <button
                    className="btn"
                    style={{ backgroundColor: "#ffcce1" }}
                    onClick={handlePlaceOrder}
                  >
                    place order
                  </button>
                  <span>total price:</span>
                  <span>{cartTotal}$</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
