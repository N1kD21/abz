import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Position } from './postion.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @ManyToOne(() => Position, (pos) => pos.user)
  position: Position;

  @Column()
  photo: string;
}
