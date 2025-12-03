// import { FC, JSX, useState } from "react";
// import { User } from "../../utils/types";
// import { UserContext } from "./UserContext";

// export const UserProvider: FC<{
//   children: JSX.Element[] | JSX.Element;
// }> = ({ children }) => {
//   const [userId, setThisUserId] = useState<User["id"] | null>(
//     null
//   );

//   const setUserId = (userId: User["id"]) => () =>
//     setUserId(userId);

//   const resetUserId = () => setThisUserId(null);

//   return (
//     <UserContext.Provider
//       value={{
//         userId,
//         setUserId,
//         resetUserId,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

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
