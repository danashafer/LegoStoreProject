import type { JSX } from "react";
import { Home } from "../views/Home";
import Layout from "../views/Layout";
import { Cart } from "../views/Cart.tsx";
import { Profile } from "../views/ProfilePage.tsx";

export interface Page {
  path: string;
  element: JSX.Element;
  name: string;
  isShown: boolean;
}

export const routes: Page[] = [
  {
    path: "/",
    element: <Home />,
    name: "Home",
    isShown: true,
  },

  {
    path: "/cart",
    element: <Cart />,
    name: "Cart",
    isShown: true,
  },
  {
    path: "/profile",
    element: <Profile />,
    name: "Profile",
    isShown: true,
  },
];

export const paths = [
  {
    path: "/",
    element: <Layout />,
    children: routes.map((route) => ({
      path: route.path,
      element: route.element,
    })),
  },
];
