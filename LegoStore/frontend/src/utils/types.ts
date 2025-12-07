export interface Lego {
  legoId: number;
  name: string;
  description: string;
  price: number;
  imageKey: string;
  categoryId: number;
}

export interface User {
  userId: number;
  username: string;
  email: string;
  role: "user" | "admin";
}

export interface LoginInfo {
  id: number;
  token: string;
}

export interface OrderItem {
  orderItemId: number;
  quantity: number;
  lego: Lego;
}

export interface Order {
  orderId: number;
  status: OrderStatus;
  createdAt: string;
  items: OrderItem[];
  totalPrice: number;
}

export enum OrderStatus {
  "pending",
  "paid",
  "shipped",
  "completed",
  "canceled",
}

export type UploadUrlResponse = {
  uploadUrl: string;
  key: string;
  publicUrl: string;
};

export type CreateLegoDto = {
  name: string;
  description: string;
  price: number;
  imageKey: string;
};

export type NewLegoFormData = {
  name: string;
  description: string;
  price: number;
  file: File | null;
};
