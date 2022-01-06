import { Controller, Get, Post, Body, Param, Patch, Delete, Request, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { MessagesService } from './messages.service';

@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(
    private messagesService: MessagesService,
  ) {}

  @Post()
  async newMessage(@Body('message') message){
    const newMessage = await this.messagesService.createNewMessage(message.conversationId, message.sender, message.text);
    return newMessage;
  }

  @Get(':conversation_id')
  async getMessage(@Param('conversation_id') conversation_id: string){
    const messages_list = await this.messagesService.getMessage(conversation_id);
    return messages_list;
  }

}
