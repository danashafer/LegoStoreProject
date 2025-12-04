import { FC, useState } from "react";

// type LoginPopupProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   onLogin: (email: string, password: string) => Promise<void> | void;
// };

export const LoginPopup = () => {
  //   if (!isOpen) return null;

  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   const [email, setEmail] = useState("");
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   const [password, setPassword] = useState("");

  //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     await onLogin(email, password);
  //   };

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
          <h2>Add a new lego</h2>

          <form>
            <div className="form-group">
              {" "}
              <label>dont have an account?</label>
              <button className="btn btn-secondary">Sign up</button>
            </div>

            <div className="form-group">
              <label>set name</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                // onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>description</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                // onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>price</label>
              <input
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                // onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
