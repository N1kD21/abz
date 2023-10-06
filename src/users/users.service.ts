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
    const posArr = await this.dataSource.manager.find(Position);
    return posArr.find((el) => el.id === _pos_id);
  }

  private async gettingToken(token: string): Promise<Token> {
    const posArr = await this.dataSource.manager.find(Token);
    return posArr.find((el) => el.token === token);
  }

  async create(dto: CreateDto[]) {
    const res: User[] = [];
    for (let i = 0; i < dto.length; i++) {
      const user = new User();
      user.name = dto[i].name;
      user.email = dto[i].email;
      user.phone = dto[i].phone;
      user.position = await this.gettingPosition(dto[i].position_id);
      user.token = await this.gettingToken(''); // change '' to normal token
      user.photo = dto[i].photo;
      res.push(user);
    }

    res.forEach(async (el) => {
      await this.dataSource.transaction(async (manager) => {
        await manager.save(el);
      });
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
