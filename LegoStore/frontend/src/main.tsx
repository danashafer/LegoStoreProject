import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import { router } from "./router";
import {UserProvider} from "./context/User"


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <main className="text-center">
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </main>
  </React.StrictMode>
);


