import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Token } from '../entities/token.entity';

@Injectable()
export class TokenService {
  constructor(private dataSource: DataSource) {}

  getToken(): string {
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
}
