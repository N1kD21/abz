import { Injectable } from '@nestjs/common';
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

  public async getToken(token: string) {
    return await this.dataSource
      .getRepository(Token)
      .createQueryBuilder('token')
      .where('token.token = :token', { token })
      .getOneOrFail();
  }

  public async deleteToken(token: Token) {
    return await this.dataSource
      .getRepository(Token)
      .createQueryBuilder()
      .softDelete()
      .where('id = :id', { id: token.id })
      .execute();
  }
}
