import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Message } from './message.model';


@Injectable()
export class MessagesService{
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<Message>,
  ) {}

  async createNewMessage(conversation_id: string, sender_id: string, text: string){
    const newMessage = new this.messageModel({conversationId: conversation_id, sender: sender_id, text: text});
    const result = await newMessage.save();
    return result;
  }

  async getMessage(conversation_id: string){
    const message_list = await this.messageModel.find({conversationId: conversation_id});
    return message_list;
  }

}
