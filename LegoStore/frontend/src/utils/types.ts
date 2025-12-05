export interface Lego {
  legoId: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
}

export interface User{
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
}

export interface LoginInfo {
  id: number;
  token: string;
}