import { AxiosResponse } from "axios";
import {
  CreateLegoDto,
  Lego,
  LoginInfo,
  Order,
  OrderStatus,
  UploadUrlResponse,
  User,
} from "../utils/types";
import axiosInstance from "./axiosInstance";

export default {
  legos() {
    return {
      getAll: (): Promise<AxiosResponse<Lego[]>> => axiosInstance.get("legos"),
      addNewLego: (lego: CreateLegoDto): Promise<AxiosResponse<Lego>> =>
        axiosInstance.post("admin/new-lego", lego, {}),
      deleteLego: (legoId: number): Promise<AxiosResponse<void>> =>
        axiosInstance.delete(`admin/lego/${legoId}`, {}),
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
        axiosInstance.get("profile", {}),
      signUp: (username: string, email: string, password: string, avatarKey?: string) =>
        axiosInstance.post("/auth/register", { username, email, password, avatarKey }),
      loginWithGoogle: (idToken: string) =>
        axiosInstance.post("/auth/google", { idToken }),
    };
  },

  carts() {
    return {
      getUserCart: (): Promise<AxiosResponse<Lego[]>> =>
        axiosInstance.get(`carts`, {}),
      addLegoToCart: (legoId: number): Promise<AxiosResponse<Lego>> =>
        axiosInstance.post(`carts/${legoId}`, null, {}),
      deleteLegoFromCart: (legoId: number): Promise<AxiosResponse<void>> =>
        axiosInstance.delete(`carts/${legoId}`, {}),
    };
  },

  orders() {
    return {
      getOrders: (): Promise<AxiosResponse<Order[]>> =>
        axiosInstance.get("orders", {}),
      placeOrder: (): Promise<AxiosResponse<void>> =>
        axiosInstance.post("orders", null, {}),
      getAllOrders: (): Promise<AxiosResponse<Order[]>> =>
        axiosInstance.get("admin/orders"),
      changeStatus: (
        orderId: number,
        newStatus: OrderStatus
      ): Promise<AxiosResponse<void>> =>
        axiosInstance.patch(`orders/${orderId}/status`, { status: newStatus }),
    };
  },
  upload() {
    return {
      getLegoImageUploadUrl: (
        legoId: string,
        fileName: string,
        fileType: string
      ): Promise<AxiosResponse<UploadUrlResponse>> =>
        axiosInstance.post(
          "uploads/lego-image",
          { legoId, fileName, fileType },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ),
      getUserAvatarUploadUrl: (
        fileName: string,
        fileType: string
      ): Promise<AxiosResponse<UploadUrlResponse>> =>
        axiosInstance.post(
          "uploads/user-avatar  ",
          { fileName, fileType },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ),
    };
  },
};
