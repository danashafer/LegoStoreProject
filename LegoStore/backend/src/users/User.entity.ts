import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Cart } from '../cart/Cart.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  role: 'user' | 'admin';

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;
}
