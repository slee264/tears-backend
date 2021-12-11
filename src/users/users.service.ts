import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.model';

import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>
  ) {}

  async insertUser(username: string, password: string, name: string) {
    const user = await this.userModel.findOne({username: username});

    if(user) return null;

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const newUser = new this.userModel({username: username, password: hash, name: name});
    const result = await newUser.save();
    return result.id as string;
  }

  async findUser(username: string): Promise<User> {
    let user;
    try{
      user = await this.userModel.findOne({username: username});
    }catch(error){
      throw new NotFoundException('Could not find user.');
    }

    if(!user) {
      throw new NotFoundException('Could not find user.')
    }

    return user;
  }

}
