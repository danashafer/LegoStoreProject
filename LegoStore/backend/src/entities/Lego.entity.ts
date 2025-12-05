import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('legos')
export class Lego {
  @PrimaryGeneratedColumn({ name: 'lego_id' })
  legoId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;
}
// @ManyToMany(() => Cart, (cart: Cart) => cart.legos, {
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// })
// carts: Cart[];
