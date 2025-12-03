import { FC, JSX, useState } from "react";
import { User } from "../../utils/types";
import { UserContext } from "./UserContext";

export const SelectedConvoyProvider: FC<{
  children: JSX.Element[] | JSX.Element;
}> = ({ children }) => {
  const [userId, setUserId] = useState<User["id"] | null>(
    null
  );

  const userCallback = (userId: User["id"]) => () =>
    setUserId(userId);

  const resetUserId = () => setUserId(null);

  return (
    <UserContext.Provider
      value={{
        userId,
        userCallback,
        resetUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
