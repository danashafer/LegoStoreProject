import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './Order.entity';
import { Lego } from 'src/lego/Lego.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn({ name: 'order_item_id' })
  orderItemId: number;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Lego)
  @JoinColumn({ name: 'lego_id' })
  lego: Lego;

  @Column()
  amount: number;

  //   @Column({
  //     name: 'price_at_purchase',
  //     type: 'decimal',
  //     precision: 10,
  //     scale: 2,
  //   })
  //   priceAtPurchase: string;
}
