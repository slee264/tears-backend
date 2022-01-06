import { Controller, Get, Post, Body, Param, Patch, Delete, Request, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ConversationsService } from './conversations.service';

@UseGuards(JwtAuthGuard)
@Controller('conversations')
export class ConversationsController {
  constructor(
    private conversationsService: ConversationsService,
  ) {}

  @Post()
  async newConversation(@Body('sender_id') sender_id: string, @Body('receiver_id') receiver_id: string){
    const new_conversation = await this.conversationsService.createConversation(sender_id, receiver_id);
    return new_conversation;
  }

  @Get(':user_id')
  async getConversation(@Param('user_id') user_id: string, @Request() req){
    const conversation_list = this.conversationsService.getConversation(user_id);
    return conversation_list;
  }

}
