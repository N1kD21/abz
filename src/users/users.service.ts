import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDto } from './dto/create.dto';
import { Position } from './entities/postion.entity';
import { Token } from './entities/token.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    private dataSource: DataSource,
  ) {}

  private async gettingPosition(_pos_id: number): Promise<Position> {
    const pos = await this.dataSource
      .getRepository(Position)
      .createQueryBuilder('position')
      .where('position.id = :id', { id: _pos_id })
      .getOneOrFail();
    return pos;
  }

  private async gettingToken(tokenCheck: string) {
    await this.dataSource
      .getRepository(Token)
      .createQueryBuilder('token')
      .where('token.token = :tokenCheck', { tokenCheck })
      .getOneOrFail();
  }

  async create(dto: CreateDto) {
    const user = new User();
    user.name = dto.name;
    user.email = dto.email;
    user.phone = dto.phone;
    user.position = (await this.gettingPosition(dto.position_id)).position;
    user.photo = dto.photo;
    await this.gettingToken(dto.token);

    await this.dataSource.transaction(async (manager) => {
      await manager.save(user);
    });
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
}
