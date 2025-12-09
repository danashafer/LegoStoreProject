import { FC, JSX, useEffect, useState } from "react";
import { User } from "../../utils/types";
import { UserContext } from "./UserContext";
import axiosInstance from "../../api/axiosInstance";
import api from "../../api";

export const UserProvider: FC<{ children: JSX.Element[] | JSX.Element }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  const resetUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    delete axiosInstance.defaults.headers.common["Authorization"];
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsReady(true);
      return;
    }

    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const loadUser = async () => {
      try {
        const res = await api.users().getProfile(); // GET /profile
        setUser(res.data);
      } catch (e) {
        resetUser();
      } finally {
        setIsReady(true);
      }
    };

    loadUser();
  }, []);

  if (!isReady) {
    return null;
  }

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
