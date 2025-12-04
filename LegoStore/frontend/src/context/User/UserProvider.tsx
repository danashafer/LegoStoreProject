
import { FC, JSX, useState } from "react";
import { User } from "../../utils/types";
import { UserContext } from "./UserContext";

export const UserProvider: FC<{ children: JSX.Element[] | JSX.Element }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const resetUser = () => setUser(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        resetUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
