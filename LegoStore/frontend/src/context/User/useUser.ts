import { useContext } from "react";
import { UserContext } from "./UserContext";

export const useUser = () => {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error(
      "selected convoy context must be used within a SelectedConvoyProvider"
    );
  }

  return user;
};
