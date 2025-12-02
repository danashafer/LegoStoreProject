import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('legos')
export class Lego {
  @PrimaryGeneratedColumn()
  lego_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;
}
