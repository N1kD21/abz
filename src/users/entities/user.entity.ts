import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Position } from './postion.entity';
import { Token } from './token.entity';

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

  @OneToOne(() => Token, (token) => token.user)
  @JoinColumn()
  token: Token;

  @Column()
  photo: string;
}
