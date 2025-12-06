import axios, { AxiosResponse } from "axios";
import { Lego, LoginInfo, Order, User } from "../utils/types";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

export default {
  legos() {
    return {
      getAll: (): Promise<AxiosResponse<Lego[]>> => axiosInstance.get("legos"),
      addNewLego: (lego: Lego): Promise<AxiosResponse<Lego>> =>
        axiosInstance.post("admin/add-new-lego", lego, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
      deleteLego: (legoId: number): Promise<AxiosResponse<void>> =>
        axiosInstance.delete(`admin/delete-lego/${legoId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
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

  carts() {
    return {
      getUserCart: (): Promise<AxiosResponse<Lego[]>> =>
        axiosInstance.get(`carts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
      addLegoToCart: (legoId: number): Promise<AxiosResponse<Lego>> =>
        axiosInstance.post(`carts/${legoId}`, null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
      deleteLegoFromCart: (legoId: number): Promise<AxiosResponse<void>> =>
        axiosInstance.delete(`carts/${legoId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
    };
  },

  orders(){
    return{
      getOrders: (): Promise<AxiosResponse<Order[]>> => 
        axiosInstance.get('orders', { 
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        } )
    }
  }
};
