import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService {
  constructor() {}

  getToken(): string {
    const rand = () => Math.random().toString(36).substr(2);
    const token = (length) =>
      (rand() + rand() + rand() + rand()).substr(0, length);
    return token(40);
  }
}
