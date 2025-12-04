import { useContext } from "react";
import { UserContext } from "./UserContext";

// export const useUser = () => {
//   const user = useContext(UserContext);

//   if (!user) {
//     throw new Error(
//       "selected convoy context must be used within a SelectedConvoyProvider"
//     );
//   }

//   return user;
// };

export const useUser = () => {
  const ctx = useContext(UserContext);

  if (!ctx) {
    throw new Error("UserContext must be used within a UserProvider");
  }

  return ctx;
};
