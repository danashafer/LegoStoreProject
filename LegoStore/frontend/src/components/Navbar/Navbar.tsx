// import { FC } from "react";
// import { NavLink } from "react-router-dom";
// import { routes, Page } from "../../router/paths";
// import { useUser } from "../../context/User";

// export const Navbar: FC = () => {
//   const { userId } = useUser();

//   return (
//     <>
//       <nav
//         className="navbar navbar-expand-lg navbar-light"
//         style={{ backgroundColor: "#e0b7ff" }}
//       >
//         <h1 className="navbar-brand">Lego Store</h1>
//         <ul className="navbar-nav mr-auto">
//           {routes
//             .filter((route: Page) => route.isShown)
//             .map((route: Page) => (
//               <li className="nav-link" key={route.name}>
//                 <NavLink
//                   to={route.path}
//                   className={({ isActive }) =>
//                     [isActive ? "active" : "text-light", "nav-link"].join(" ")
//                   }
//                 >
//                   {route.name}
//                 </NavLink>
//               </li>
//             ))}
//           {!userId && (
//             <li className="nav-link" key={"login"}>
//               <NavLink
//                 to={"/login"}
//                 className={({ isActive }) =>
//                   [isActive ? "active" : "text-light", "nav-link"].join(" ")
//                 }
//               >
//                 {"login"}
//               </NavLink>
//             </li>
//           )}

//           {/* {!userId && <p>login</p>} */}
//         </ul>
//       </nav>
//     </>
//   );
// };

import { FC, useState, MouseEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { routes, Page } from "../../router/paths";
import { useUser } from "../../context/User";
import { LoginPopup } from "../LoginPopup"

export const Navbar: FC = () => {
  const { userId } = useUser();
  const navigate = useNavigate();

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
    if (!userId) {
      e.preventDefault();
      openLogin(path);
    }
  };

  const handleLoginNavClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!userId) {
      e.preventDefault();
      openLogin(null);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoginOpen(false);
    if (afterLoginPath) {
      navigate(afterLoginPath);
      setAfterLoginPath(null);
    }
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
                      !userId &&
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

          {!userId && (
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
        </ul>
      </nav>

      <LoginPopup
        isOpen={isLoginOpen}
        onClose={closeLogin}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
};
