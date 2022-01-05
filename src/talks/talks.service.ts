import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Talk } from './talk.model';
import { User } from '../users/user.model';


@Injectable()
export class TalksService{
  constructor(
    @InjectModel('Talk') private readonly talkModel: Model<Talk>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async createRoom(user: any, room_id: string){
    const newTalk = new this.talkModel({host: {username: user.username, name: user.name}, room_id: room_id, time_created: new Date()});
    const result = await newTalk.save();
    return result.id as string;
  }

  async updateRoom(talk_id: string, room_id: string){
    console.log(room_id);
    const talk = await this.talkModel.findById(talk_id);
    talk.room_id = room_id;
    return await talk.save();
  }

  async deleteRoom(id: String){
      console.log(await this.talkModel.deleteOne({ _id: id }));
  }

  async getUserList(name: string){
    const userList = await this.userModel.find({ $or: [{username: name}, {name: name}]}).exec();
    return userList;
  }

  async addUserToTalk(talk_id: string, user_id: string, username: string, name: string){
    const talk = await this.talkModel.findById(talk_id);
    talk.members.push({user_id: user_id, username, name});
    return await talk.save();
  }

  async joinRoom(user: any, id: String){
    const room = await this.talkModel.findById(id);
    room.members.push(user.name);
    room.save();
  }

}
