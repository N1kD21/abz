import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Position {
  @PrimaryGeneratedColumn({ name: 'position_id' })
  id: number;

  @Column()
  position: string;

  @OneToMany(() => User, (user) => user.position)
  user: User[];
}
