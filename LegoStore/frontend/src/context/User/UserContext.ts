// import { createContext } from "react";
// import { User } from "../../utils/types";

// export interface UserContextType {
//   userId: User["id"] | null;
//   setUserId: (userId: User["id"]) => () => void;
//   resetUserId: () => void;
// }

// export const UserContext =
//   createContext<UserContextType | null>(null);

import { createContext } from "react";
import { User } from "../../utils/types";

export interface UserContextType {
  user: User| null;
  setUser: (userId: User | null) => void;
  resetUser: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);
