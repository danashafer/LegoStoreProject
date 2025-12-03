import { FC, useState } from "react";

type LoginPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<void> | void;
};

export const LoginPopup: FC<LoginPopupProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  if (!isOpen) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [email, setEmail] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onLogin(email, password);
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "12px",
            minWidth: "320px",
            maxWidth: "90vw",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              {" "}
              <label>dont have an account?</label>
              <button className="btn btn-secondary">Sign up</button>
            </div>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                          onChange={e => setPassword(e.target.value)}

              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
            >
              Login
            </button>
          </form>

        
        </div>
      </div>
    </>
  );
};
