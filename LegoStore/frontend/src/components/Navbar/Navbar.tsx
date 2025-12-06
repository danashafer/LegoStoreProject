
import { FC, useState, MouseEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { routes, Page } from "../../router/paths";
import { useUser } from "../../context/User";
import { AuthPopup } from "../AuthPopup/AuthPopup";
import axiosInstance from "../../api/axiosInstance";

export const Navbar: FC = () => {
  const { user, setUser, resetUser } = useUser();
  const navigate = useNavigate();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [afterLoginPath, setAfterLoginPath] = useState<string | null>(null);

  const handleLogout = () => {
    resetUser();
    navigate("/");
  };

  const openAuth = (path: string | null = null) => {
    setAfterLoginPath(path);
    setIsAuthOpen(true);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
    setAfterLoginPath(null);
  };

  const handleProtectedClick = (
    e: MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    if (!user) {
      e.preventDefault();
      openAuth(path);
    }
  };

  const handleLoginNavClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!user) {
      e.preventDefault();
      openAuth(null);
    }
  };

  const handleAuthSuccess = (data: {
    id: number;
    username: string;
    email: string;
    role: "user" | "admin";
    token: string;
  }) => {
    localStorage.setItem("token", data.token);

    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.token}`;

    setUser({
      userId: data.id,
      username: data.username,
      email: data.email,
      role: data.role,
    });

    if (afterLoginPath) {
      navigate(afterLoginPath);
      setAfterLoginPath(null);
    }

    setIsAuthOpen(false);
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#e0b7ff" }}
      >
        <h1 className="navbar-brand">Lego Store</h1>
        <ul className="navbar-nav mr-auto">
          {routes
            .filter((route: Page) => route.isShown)
            .map((route: Page) => (
              <li className="nav-link" key={route.name}>
                <NavLink
                  to={route.path}
                  className={({ isActive }) =>
                    [
                      isActive ? "active text-light" : "text-dark",
                      "nav-link",
                    ].join(" ")
                  }
                  onClick={(e) => {
                    if (
                      !user &&
                      (route.path === "/cart" || route.path === "/profile")
                    ) {
                      handleProtectedClick(e, route.path);
                    }
                  }}
                >
                  {route.name}
                </NavLink>
              </li>
            ))}

          {!user && (
            <li className="nav-link" key="login">
              <button
                className="btn nav-link"
                style={{ backgroundColor: "#ffcce1" }}
                onClick={handleLoginNavClick}
              >
                login
              </button>
            </li>
          )}

          {user && (
            <li className="nav-link" key="logout">
              <button
                className="btn"
                style={{ backgroundColor: "#ffcce1" }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>

      <AuthPopup
        isOpen={isAuthOpen}
        onClose={closeAuth}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
};
