import { IsNumber, IsString } from 'class-validator';

export class TakePositionsDto {
  @IsString()
  pos: string;
  @IsNumber()
  id: number;
}
