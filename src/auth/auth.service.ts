import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findUser(username);
    const match = await bcrypt.compare(password, user.password);
    if(match){
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {username: user.username, name:user.name, sub: user._id};
    return this.jwtService.sign(payload);
  }
}
