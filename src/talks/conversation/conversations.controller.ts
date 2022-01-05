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
  async newConversation(@Request() sender, @Body('receiver_id') receiver_id: string){
    await this.conversationsService.createConversation(sender._id, receiver_id);
  }

  @Get()
  async getConversation(@Request() req){
    const conversation_list = this.conversationsService.getConversation(req.user._id);
    return conversation_list;
  }

}
