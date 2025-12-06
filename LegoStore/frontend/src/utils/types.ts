export interface Lego {
  legoId: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
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
  status: orderStatus;
  createdAt: string;
  items: OrderItem[];
}

enum orderStatus {
  "pending",
  "paid",
  "shipped",
  "completed",
  "canceled",
}
