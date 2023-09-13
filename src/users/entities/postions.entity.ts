import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.position)
  position: string;

  @Column()
  position_id: number;
}
