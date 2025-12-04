export interface Lego {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface User{
  id: number;
  username: string;
  email: string;
}

export interface LoginInfo {
  id: number;
  token: string;
}