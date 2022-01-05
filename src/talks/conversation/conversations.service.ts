import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Conversation } from './conversation.model';


@Injectable()
export class ConversationsService{
  constructor(
    @InjectModel('Conversation') private readonly conversationModel: Model<Conversation>,
  ) {}

  async createConversation(sender_id: any, receiver_id: string){
    const newConversation = new this.conversationModel({members: [sender_id, receiver_id]});
    const result = await newConversation.save();
    return result.id as string;
  }

  async getConversation(user_id: string){
    const conversation_list = await this.conversationModel.find({members: {$in: [user_id]}});
    return conversation_list;
  }

}
