import { FC } from "react";
import { NavLink } from "react-router-dom";
import { routes, Page } from "../../router/paths";

export const Navbar: FC = () => {
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
            <li className="nav-link"  key={route.name}>
              <NavLink
                to={route.path}
                className={({ isActive }) =>
                  [isActive ? "active" : "text-light", "nav-link"].join(" ")
                }
              >
                {route.name}
              </NavLink>
            </li>
          ))}
      </ul>
    </nav>

    </>
  );
};
