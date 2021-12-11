import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async addUser(@Body('username') username: string, @Body('password') password: string, @Body('name') name: string) {
    const generatedId = await this.usersService.insertUser(username, password, name);
    if(!generatedId)
    return {id: generatedId};
  }

  @Get(':username')
  async getUser(@Param('username') username: string) {
    const user = await this.usersService.findUser(username);
    return user;
  }
}
