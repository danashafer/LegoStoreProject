import Swal from "sweetalert2";
import api from "..";
import { User } from "../../utils/types";
import { useEffect, useState } from "react";
import { useUser } from "../../context/User";

// export const useLoginUser = (email: string, password: string) => {
//   const [user, setUser] = useState<User>();

//   useEffect(() => {
//     const loginUser = async () => {
//       try {
//         setUser((await api.users().login(email, password)).data);
//       } catch (error: unknown) {
//         Swal.fire("אופס!", "נראה שיש  בעיה בהצגת השיירות, נסה שוב", "error");
//       }
//     };

//     loginUser();
//   }, []);

//   return user;
// };

// export const useLoginUser = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<Error | null>(null);

//   const loginUser = async (email: string, password: string) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await api.users().login(email, password);
//       setUser(response.data);

//       // if you have a User context and want this hook to update it
//       const { setUserId } = useUser()
//       setUserId(response.data.id)

//       return response.data;
//     } catch (err: unknown) {
//       Swal.fire("אופס!", "נראה שיש בעיה בהתחברות, נסה שוב", "error");
//       const e = err instanceof Error ? err : new Error("Login failed");
//       setError(e);
//       throw e;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return {
//     user,
//     loginUser,
//     isLoading,
//     error,
//   };
// };

export const useLoginUser = () => {
  const { userId, setUserId } = useUser();

  const [user, setUser] = useState<User | null>(null);
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
      const loggedUser = response.data;
      console.log("the logged user is:");
      console.log(loggedUser);

      setUser(loggedUser);
      setUserId(loggedUser.id);
      console.log(userId);

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
