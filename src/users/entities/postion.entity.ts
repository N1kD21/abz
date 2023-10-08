import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Position {
  @PrimaryGeneratedColumn({ name: 'position_id' })
  id: number;

  @Column()
  position: string;
}
