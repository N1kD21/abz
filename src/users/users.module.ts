import { Module } from '@nestjs/common';
import { ApiController } from './api/api.controller';
import { TokenService } from './token/token.service';
import { PositionsService } from './positions/positions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { PicturesService } from './pictures/pictures.service';
import { Position } from './entities/postion.entity';
import { Token } from './entities/token.entity';
import { AddNewUserService } from './add-new-user/add-new-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Position, Token])],
  controllers: [ApiController],
  providers: [TokenService, PositionsService, UsersService, PicturesService, AddNewUserService],
})
export class UsersModule {}
