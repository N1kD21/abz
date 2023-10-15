import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Token } from '../entities/token.entity';

@Injectable()
export class TokenService {
  constructor(private dataSource: DataSource) {}

  public generateToken(): string {
    const rand = () => Math.random().toString(36).substr(2);
    const token = (length) =>
      (rand() + rand() + rand() + rand()).substr(0, length);
    const res = token(40);
    this.putInDb(res);
    return res;
  }

  private putInDb(token: string) {
    const tokenNew = new Token();
    tokenNew.token = token;
    this.dataSource.manager.save(tokenNew);
  }

  private checkTime(token: Token) {
    if (Date.now() - token.createAt.getTime() > 40 * 60000) {
      throw new BadRequestException(
        'Token is expired. Create new Token and try again.',
      );
    }
    return token;
  }

  public async getToken(token: string) {
    let res = await this.dataSource
      .getRepository(Token)
      .createQueryBuilder('token')
      .where('token.token = :token', { token })
      .getOneOrFail();
    res = this.checkTime(res);
    return res;
  }

  public async deleteToken(token: Token) {
    return await this.dataSource
      .getRepository(Token)
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id: token.id })
      .execute();
  }
}
