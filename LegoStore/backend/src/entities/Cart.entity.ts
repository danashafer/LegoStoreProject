import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.entity';
import { Lego } from './Lego.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn({ name: 'cart_id' })
  cartId: number;

  @OneToOne(() => User, (user) => user.cart)
  user: User;

  @Column({ name: 'user_id' })
  userId: number;
  @ManyToMany(() => Lego, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'cart_items',
    joinColumn: { name: 'cart_id', referencedColumnName: 'cartId' },
    inverseJoinColumn: { name: 'lego_id', referencedColumnName: 'legoId' },
  })
  legos: Lego[];
}
