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

  async insertUser(username: string, password: string) {

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const newUser = new this.userModel({username: username, password: hash});
    const result = await newUser.save();
    return result.id as string;
  }

  async addName(username: string, name: string) {
    const user = await this.findUser(username);
    user.name = name;
    const result = await user.save();
    return result.name as string;
  }

  async checkUsername(username: string): Promise<boolean> {
    const user = await this.userModel.findOne({username: username});
    if(user){
      return true;
    }else{
      return false;
    }
  }

  async findUser(usernameOrId: string): Promise<User> {
    let user = await this.userModel.findOne({username: usernameOrId});
    if(!user){
      user = await this.userModel.findById(usernameOrId);
    }

    if(!user) {
      return null;
    }
    return user;
  }

  async getUsers(name: string){
    const userList = await this.userModel.find({ $or: [{username: name}, {name: name}]}).exec();
    return userList;
  }

}
