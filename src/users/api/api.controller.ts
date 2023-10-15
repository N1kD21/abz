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

@Controller('api/v1')
export class ApiController {
  baseresp = {
    success: true,
  };

  constructor(
    private readonly tokenService: TokenService,
    private readonly positionService: PositionsService,
    private readonly usersService: UsersService,
  ) {}

  @Get('/token')
  private getToken() {
    this.baseresp['token'] = this.tokenService.generateToken();
    return this.baseresp;
  }

  @Get('/user/:id')
  private async getById(@Param('id', ParseIntPipe) id: number) {
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
  private getPositions() {
    //this.picturesService.cropping_img();
    const res = this.positionService.getPositions();
    return this.generateRes(res);
  }

  @UsePipes(new ValidationPipe())
  @Post('/user')
  private authUsers(@Body() dto: CreateDto) {
    this.usersService.create(dto);
    const res = dto;
    return this.generateRes(res);
  }

  @Get('/users')
  private async allUsers() {
    const res = await this.usersService.getAllUsers();
    return this.generateRes(res);
  }

  private generateRes(res) {
    const status = res.length ? 200 : 404;
    const message = res.length ? 'Success!' : 'Not Found!';
    return { res, message, status };
  }
}
