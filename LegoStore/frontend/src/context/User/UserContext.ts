import { createContext } from "react";
import { User } from "../../utils/types";

export interface UserContextType {
  userId: User["id"] | null;
  userCallback: (convoyId: User["id"]) => () => void;
  resetUserId: () => void;
}

export const UserContext =
  createContext<UserContextType | null>(null);
