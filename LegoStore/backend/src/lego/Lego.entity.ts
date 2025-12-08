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

  @Column()
  amount: number;

  @Column({ name: 'image_key', nullable: true })
  imageKey: string;
}
