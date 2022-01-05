import { Controller, Get, Post, Body, Param, Patch, Delete, Request, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(
    private messagesService: MessagesService,
  ) {}

  @Post()
  async newMessage(@Body('conversation_id') conversation_id: string, @Request() sender, @Body('text') text: string){
    await this.messagesService.createNewMessage(conversation_id, sender._id, text);
  }

  @Get(':conversation_id')
  async getMessage(@Param('conversation_id') conversation_id: string){
    const messages_list = await this.messagesService.getMessage(conversation_id);
    return messages_list;
  }

}
