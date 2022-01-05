import { Controller, Get, Post, Body, Param, Patch, Delete, Request, UseGuards } from '@nestjs/common';
import { TalksService } from './talks.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('talks')
export class TalksController {
  constructor(
    private talksService: TalksService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createRoom(@Request() req, @Body('room_id') room_id: string){
    return await this.talksService.createRoom(req.user, room_id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async updateRoom(@Body('talk_id') talk_id: string, @Body('room_id') room_id: string){
    return await this.talksService.updateRoom(talk_id, room_id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete')
  async deleteRoom(@Request() req, @Body('id') id: string){
    console.log(id);
    return await this.talksService.deleteRoom(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('search_user')
  async getUser(@Body('username_or_name') name: string){
    const list = await this.talksService.getUserList(name);
    let return_list = [];
    list.map((item) => return_list.push({id: item._id, username: item.username, name: item.name}));
    return return_list;
  }

  @UseGuards(JwtAuthGuard)
  @Post('invite_user')
  async inviteUser(@Body('user') user, @Body('talk_id') talk_id: string){
    await this.talksService.addUserToTalk(talk_id, user.id, user.username, user.name);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('join:id')
  async joinRoom(@Request() req, @Param('id') id: string) {
    await this.talksService.joinRoom(req.user, id);
  }

}
