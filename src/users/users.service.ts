import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateDto } from './dto/create.dto';
import { Position } from './entities/postion.entity';
import { Token } from './entities/token.entity';
import { TokenService } from './token/token.service';

@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,
    private tS: TokenService,
  ) {}

  private async gettingPosition(_pos_id: number): Promise<Position> {
    const pos = await this.dataSource
      .getRepository(Position)
      .createQueryBuilder('position')
      .where('position.id = :id', { id: _pos_id })
      .getOneOrFail();
    return pos;
  }

  async create(dto: CreateDto) {
    const user = new User();
    user.name = dto.name;
    user.email = dto.email;
    user.phone = dto.phone;
    user.position = (await this.gettingPosition(dto.position_id)).position;
    user.photo = dto.photo;
    const token: Token = await this.tS.getToken(dto.token);

    await this.dataSource.manager.save(user);
    await this.tS.deleteToken(token);
  }

  async getById(id: number) {
    const repository = this.dataSource.getRepository(User);
    // now you can call repository methods, for example find:
    const users = await repository.find();
    const userObj = users.find((user) => {
      return user.id === id;
    });
    return userObj;
  }

  public async getAllUsers() {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .getMany();
  }
}
