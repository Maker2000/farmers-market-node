import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from 'src/modules/user/service/user.service';
import { CreateUserDto } from '../domain/user.dto';
import { AllowAnonymous } from 'src/decorators/decorators';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
  @Post()
  @AllowAnonymous()
  async createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }
}
