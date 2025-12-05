import axios, { AxiosResponse } from "axios";
import { Lego, LoginInfo, User } from "../utils/types";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

export default {
  legos() {
    return {
      getAll: (): Promise<AxiosResponse<Lego[]>> => axiosInstance.get("legos"),
      addNewLego: (
        setName: string,
        description: string,
        price: string
      ): Promise<AxiosResponse<Lego>> =>
        axiosInstance.post("admin/add-new-lego", {setName, description, price}),
    };
  },
  users() {
    return {
      login: (
        email: string,
        password: string
      ): Promise<AxiosResponse<LoginInfo>> =>
        axiosInstance.post("auth/login", { email, password }),

      getProfile: (): Promise<AxiosResponse<User>> =>
        axiosInstance.get("profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
    };
  },
};
