// import { FC, useState } from "react";

// type LoginPopupProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   onLogin: (email: string, password: string) => Promise<void> | void;
// };

// export const LoginPopup: FC<LoginPopupProps> = ({
//   isOpen,
//   onClose,
//   onLogin,
// }) => {
//   if (!isOpen) return null;

//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const [email, setEmail] = useState("");
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     await onLogin(email, password);
//   };

//   return (
//     <>
//       <div
//         style={{
//           position: "fixed",
//           inset: 0,
//           backgroundColor: "rgba(0,0,0,0.5)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           zIndex: 9999,
//         }}
//       >
//         <div
//           style={{
//             backgroundColor: "white",
//             padding: "24px",
//             borderRadius: "12px",
//             minWidth: "320px",
//             maxWidth: "90vw",
//             boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
//           }}
//         >
//           <h2>Login</h2>

//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               {" "}
//               <label>dont have an account?</label>
//               <button className="btn btn-secondary">Sign up</button>
//             </div>

//             <div className="form-group">
//               <label>Email address</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="exampleInputEmail1"
//                 aria-describedby="emailHelp"
//                 placeholder="Enter email"
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <small id="emailHelp" className="form-text text-muted">
//                 We'll never share your email with anyone else.
//               </small>
//             </div>
//             <div className="form-group">
//               <label>Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="exampleInputPassword1"
//                 placeholder="Password"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             <button type="submit" className="btn btn-primary">
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

import { FC, useState, FormEvent } from "react";
import api from "../../api";
import { GoogleLogin } from "@react-oauth/google";

type AuthMode = "login" | "signup";

type AuthPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (data: {
    id: number;
    username: string;
    email: string;
    role: "user" | "admin";
    token: string;
  }) => void;
};

export const AuthPopup: FC<AuthPopupProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<AuthMode>("login");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const switchToLogin = () => {
    setMode("login");
    resetForm();
  };

  const switchToSignup = () => {
    setMode("signup");
    resetForm();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      let res;

      if (mode === "login") {
        res = await api.users().login(email, password);
      } else {
        res = await api.users().signUp(username, email, password);
      }

      onAuthSuccess(res.data);
      resetForm();
      onClose();
    } catch (err) {
      console.error(err);
      // show toast or alert here if you want
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "12px",
          minWidth: "340px",
          maxWidth: "90vw",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        {/* header with mode buttons */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 style={{ margin: 0 }}>
            {mode === "login" ? "Login" : "Sign up"}
          </h3>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={onClose}
          >
            X
          </button>
        </div>

        {/* mode toggle */}
        <div className="mb-3">
          <button
            type="button"
            className={`btn btn-sm me-2 ${
              mode === "login" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={switchToLogin}
          >
            Login
          </button>
          <button
            type="button"
            className={`btn btn-sm ${
              mode === "signup" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={switchToSignup}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <div className="form-group mb-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {mode === "login" ? "Login" : "Create account"}
          </button>
          <div
            style={{ display: "flex", alignItems: "center", margin: "12px 0" }}
          >
            {" "}
            <div style={{ flex: 1, height: 1, backgroundColor: "#ddd" }} />{" "}
            <span style={{ margin: "0 8px", fontSize: 12, color: "#666" }}>
              {" "}
              or{" "}
            </span>{" "}
            <div style={{ flex: 1, height: 1, backgroundColor: "#ddd" }} />{" "}
          </div>{" "}
          <div style={{ display: "flex", justifyContent: "center" }}>
            {" "}
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const idToken = credentialResponse.credential;
                  if (!idToken) return;

                  const res = await api.users().loginWithGoogle(idToken);

                  onAuthSuccess(res.data);
                  resetForm();
                  onClose();
                } catch (err) {
                  console.error(err);
                }
              }}
              onError={() => {
                console.log("Google Login failed");
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
