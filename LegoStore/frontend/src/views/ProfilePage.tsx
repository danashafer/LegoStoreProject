import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/User";
import { useEffect } from "react";

export const Profile = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const imageUrl = user?.avatarKey
    ? `https://lego-store-assets.s3.eu-north-1.amazonaws.com/${user.avatarKey}`
    : ".././assets/images/defaultProfileImage.png";
  useEffect(() => {
    console.log(user?.email);
    if (!user) {
      console.log("user is null");
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="m-3 position-relative  " style={{ width: 800 }}>
          <img
            src=".././assets/images/backgroundLegoBig.png"
            alt=""
            className="w-100"
          />
          <div className="position-absolute top-50 start-50 translate-middle bg-light rounded w-75 h-75">
            <img
              src={imageUrl}
              alt=""
              className="rounded-circle m-2 border border-seconsary"
              style={{ height: 200, width: 200 }}
            />
            <p className="fw-bold">{user?.username}</p>
            <p>{user?.email}</p>

            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#ffcce1" }}
            >
              <NavLink to="/order-history">view order history</NavLink>
              <i className="bi bi-clock-history"></i>
            </button>
            {user?.role == "admin" && (
              <button
                type="submit"
                className="btn"
                style={{ backgroundColor: "#ffcce1" }}
              >
                <NavLink to="/admin-orders">view all orders</NavLink>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
