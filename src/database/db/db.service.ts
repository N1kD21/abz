import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Injectable()
export class DbService {
  constructor(private readonly configService: ConfigService) {}

  connection() {
    console.log(this.configService.get('DB_NAME'));
    console.log(this.configService.get('DB_HOST'));
    console.log(this.configService.get('DB_PORT'));
    console.log(this.configService.get('DB_USERNAME'));
    console.log(this.configService.get('DB_PASSWORD'));

    const pool = new Pool({
      host: '127.0.0.1',
      port: 5432,
      database: 'db',
      user: 'postgres',
      password: '12345',
    });

    (async () => {
      const fields = ['schemaname', 'tablename', 'tableowner'].join(', ');
      const sql = `SELECT ${fields} FROM pg_tables WHERE tableowner = $1`;
      const { rows } = await pool.query(sql, ['postgres']);
      console.table(rows);
      pool.end();
    })();
  }
}
