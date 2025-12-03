import { FC } from "react";

type LoginPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export const LoginPopup: FC<LoginPopupProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  if (!isOpen) return null;

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
          minWidth: "320px",
          maxWidth: "90vw",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h2>Login</h2>

        {/* Your login form here */}
        {/* Example placeholder */}
        {/* 
      <LoginForm
        onSuccess={() => {
          onSuccess()
        }}
        onCancel={onClose}
      />
    */}

        <button onClick={onSuccess}>Fake success</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
