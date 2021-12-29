import { Controller, Get, Post, Body, Param, Patch, Delete, Request, UseGuards } from '@nestjs/common';
import { WritesService } from './writes.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('writes')
export class WritesController {
  constructor(private writesService: WritesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async addWrite(@Request() req, @Body('title') writeTitle: string, @Body('body') writeBody: string) {
    const generatedId = await this.writesService.insertWrite(writeTitle, writeBody, req.user.username);
    return {id: generatedId };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllWrites(@Request() req) {
    const writes = await this.writesService.getAllWritesBy(req.user.username);
    writes.sort((a, b) => {
      if(a.lastEdited < b.lastEdited){
        return 1;
      }else if(a.lastEdited > b.lastEdited){
        return -1;
      }else{
        return 0;
      }
    })
    return writes;
  }

  @Get(':writeId')
  async getWrite(@Param('writeId') writeId: string) {
    const write = await this.writesService.getSingleWriteBy(writeId);
    return write;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':writeId')
  async updateWrite(@Param('writeId') writeId: string, @Body('title') writeTitle: string, @Body('content') writeContent: string) {
    await this.writesService.updateWrite(writeId, writeTitle, writeContent);
    return null;
  }

  @Delete(':writeId')
  async removeWrite(@Param('writeId') writeId: string) {
    await this.writesService.removeWrite(writeId);
    return null;
  }
}
