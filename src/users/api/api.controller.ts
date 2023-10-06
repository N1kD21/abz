import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TokenService } from '../token/token.service';
import { PositionsService } from '../positions/positions.service';
import { CreateDto } from '../dto/create.dto';
import { UsersService } from '../users.service';
import { PicturesService } from '../pictures/pictures.service';

@Controller('api/v1')
export class ApiController {
  baseresp = {
    success: true,
  };

  constructor(
    private readonly tokenService: TokenService,
    private readonly positionService: PositionsService,
    private readonly usersService: UsersService,
    private readonly picturesService: PicturesService,
  ) {}

  @Get('/token')
  getToken(): string {
    return this.tokenService.getToken();
  }

  @Get('/users/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    if (id < 1) {
      throw new BadRequestException('Id має бути більше 0');
    }
    const res = await this.usersService.getById(id);
    if (res === undefined) {
      throw new NotFoundException('Такий Id відсутній у БД');
    }
    this.baseresp['user'] = res;
    return this.baseresp;
  }

  @Get('/positions')
  getPositions() {
    this.picturesService.cropping_img();
    return this.positionService.getPositions();
  }

  @UsePipes(new ValidationPipe())
  @Post('/users')
  authUsers(@Body() dto: CreateDto) {
    //this.usersService.create([dto]);
    return dto;
  }
}
