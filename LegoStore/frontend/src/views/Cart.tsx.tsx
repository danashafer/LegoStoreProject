import { useEffect } from "react";
import { useUser } from "../context/User";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("user is null");
      navigate("/");
    }
  }, [user, navigate]);

  return (

    <>
      <div className="d-flex justify-content-center">
        <div className="m-3 position-relative  " style={{ width: 2000 }}>
          <img
            src=".././assets/images/backgroundLegoBig.png"
            alt=""
            className="w-100"
          />
          <div className="position-absolute top-50 start-50 translate-middle bg-light rounded w-75 h-75">
            <h1> your cart</h1>
            <div>
              
            </div>

            {/* <img
              src=""
              alt=""
              className="rounded-circle m-2 border border-seconsary"
              style={{ height: 200, width: 200 }}
            />
            <p className="fw-bold">user name</p>
            <p>{user?.email}</p>

            <div className="bg-secondary w-25 position-absolute start-50 translate-middle mt-3g rounded ">
              <p> view order history</p>
            </div>

            <i className="bi bi-clock-history"></i> */}
          </div>
        </div>
      </div>
    </>
  // <h1> this is the cart page </h1>
  )
};
