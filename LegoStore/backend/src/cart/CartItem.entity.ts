import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lego } from '../lego/Lego.entity';
import { Cart } from './Cart.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn({ name: 'cart_item_id' })
  cartItemId: number;

  @Column()
  amount: number;

  @Column({ name: 'lego_id' })
  legoId: number;

  @ManyToOne(() => Lego)
  @JoinColumn({ name: 'lego_id' })
  lego: Lego;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;
}
