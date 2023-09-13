import { Module } from '@nestjs/common';
import { ApiController } from './api/api.controller';
import { TokenService } from './token/token.service';
import { PositionsService } from './positions/positions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { PicturesService } from './pictures/pictures.service';
import { Position } from './entities/postions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Position])],
  controllers: [ApiController],
  providers: [TokenService, PositionsService, UsersService, PicturesService],
})
export class UsersModule {}
