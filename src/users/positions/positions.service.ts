import { Injectable } from '@nestjs/common';
import { TakePositionsDto } from '../dto/takePositions.dto';

@Injectable()
export class PositionsService {
  getPositions(): TakePositionsDto[] {
    return [
      { pos: 'Security', id: 1 },
      { pos: 'Designer', id: 2 },
      { pos: 'Content manager', id: 3 },
      { pos: 'Lawyer', id: 4 },
      { pos: 'Developer', id: 5 },
    ];
  }
}
