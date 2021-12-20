import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('account')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/register')
  async addUser(@Body('username') username: string, @Body('password') password: string) {
    const generatedId = await this.usersService.insertUser(username, password);
    return {id: generatedId};
  }

  @Post('/register/add-name')
  async addName(@Body('username') username: string, @Body('name') name: string) {
    const result = await this.usersService.addName(username, name);
    return result;
  }

  @Post('/confirm-email')
  async confirmUsername(@Body('email') username: string){
    const userExists = await this.usersService.findUser(username);

    if(userExists){
      return true;
    }else{
      return false;
    }
  }

  @Get(':username')
  async getUser(@Param('username') username: string) {
    const user = await this.usersService.findUser(username);
    return user;
  }
}
