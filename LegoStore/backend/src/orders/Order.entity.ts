import { Lego } from 'src/lego/Lego.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

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

  @ManyToMany(() => Lego, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'order_items',
    joinColumn: { name: 'order_id', referencedColumnName: 'orderId' },
    inverseJoinColumn: { name: 'lego_id', referencedColumnName: 'legoId' },
  })
  legos: Lego[];
}
