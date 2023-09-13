import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Position } from './postions.entity';

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

  @Column()
  position_id: number;

  @OneToOne(() => Position, (pos) => pos.position)
  @JoinColumn()
  position: string;

  @Column()
  photo: string;
}
