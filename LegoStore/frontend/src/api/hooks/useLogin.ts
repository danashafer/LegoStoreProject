import Swal from "sweetalert2";
import api from "..";
import { useState } from "react";
import { useUser } from "../../context/User";

export const useLoginUser = () => {
  const { user, setUser } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loginUser = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    console.log("user loging in in the hook");

    try {
      console.log(email);
      const response = await api.users().login(email, password);
      console.log(response);
      const loginInfo = response.data;
      console.log("the logged user is:");
      console.log(loginInfo);

      localStorage.setItem("token", loginInfo.token);

      const loggedUser = await (
        await api.users().getProfile()
      ).data;
      console.log(loggedUser);

      setUser(loggedUser);

      return loggedUser;
    } catch (err: unknown) {
      Swal.fire("אופס!", "נראה שיש בעיה בהתחברות, נסה שוב", "error");
      const e = err instanceof Error ? err : new Error("Login failed");
      setError(e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    loginUser,
    isLoading,
    error,
  };
};
