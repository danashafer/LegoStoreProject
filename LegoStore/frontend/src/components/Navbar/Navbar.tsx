import { FC, useState, MouseEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { routes, Page } from "../../router/paths";
import { useUser } from "../../context/User";
import { LoginPopup } from "../LoginPopup";
import { useLoginUser } from "../../api/hooks/useLogin.ts";

export const Navbar: FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const { loginUser, isLoading, error } = useLoginUser()

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [afterLoginPath, setAfterLoginPath] = useState<string | null>(null);

  const openLogin = (path: string | null = null) => {
    setAfterLoginPath(path);
    setIsLoginOpen(true);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
    setAfterLoginPath(null);
  };

  const handleProtectedClick = (
    e: MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    if (!user) {
      e.preventDefault();
      openLogin(path);
    }
  };

  const handleLoginNavClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!user) {
      e.preventDefault();
      openLogin(null);
    }
  };

  const handleLoginSuccess = async (email: string, password: string) => {
    setIsLoginOpen(false);

    if (afterLoginPath) {
      navigate(afterLoginPath);
      setAfterLoginPath(null);
    }
    console.log("user logging in")

    loginUser(email, password);
    console.log(user);
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
                    [isActive ? "active" : "text-light", "nav-link"].join(" ")
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
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  [isActive ? "active" : "text-light", "nav-link"].join(" ")
                }
                onClick={handleLoginNavClick}
              >
                login
              </NavLink>
            </li>
          )}
          {user && (
            <li className="nav-link" key="login">
              <p>{user.id}</p>
            </li>
          )}
        </ul>
      </nav>

      <LoginPopup
        isOpen={isLoginOpen}
        onClose={closeLogin}
        onLogin={handleLoginSuccess}
      />
    </>
  );
};
