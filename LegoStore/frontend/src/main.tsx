import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import { router } from "./router";
import { UserProvider } from "./context/User";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

const GOOGLE_CLIENT_ID =
  "84748448598-2u992o2il10dcc5md73gl4872fs4549a.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <main className="text-center">
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <UserProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" toasterId="default" />
        </UserProvider>
      </GoogleOAuthProvider>
    </main>
  </React.StrictMode>
);
