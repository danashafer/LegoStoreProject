import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn({ name: 'order_id' })
  orderId: number;

  @Column()
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'canceled';

  @Column()
  userId: number;

  @Column()
  createdAt: Date;
}
