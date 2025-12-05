export type AuthJwtPayload = {
  sub: number;
  role: 'admin' | 'user';
};
