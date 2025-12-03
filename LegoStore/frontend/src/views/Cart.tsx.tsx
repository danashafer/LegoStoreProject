import { useEffect } from "react";
import { useUser } from "../context/User";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { userId } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      console.log("user is null");
      navigate("/");
    }
  }, [userId, navigate]);

  return <h1> this is the cart page </h1>;
};
