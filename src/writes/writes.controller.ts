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
    const writes = await this.writesService.getAllSortedWritesBy(req.user.username);
    return writes;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllWrites(@Request() req) {
    const writes = await this.writesService.getAllSortedWritesBy(req.user.username);
    return writes;
  }

  @Get(':writeId')
  async getWrite(@Param('writeId') writeId: string) {
    const write = await this.writesService.getSingleWriteBy(writeId);
    return write;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':writeId')
  async updateWrite(@Request() req, @Param('writeId') writeId: string, @Body('title') writeTitle: string, @Body('body') writeBody: string) {
    const id = await this.writesService.updateWrite(writeId, writeTitle, writeBody);
    const writes = await this.writesService.getAllSortedWritesBy(req.user.username);
    return writes;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':writeId')
  async removeWrite(@Request() req, @Param('writeId') writeId: string) {
    await this.writesService.removeWrite(writeId);
    const writes = await this.writesService.getAllSortedWritesBy(req.user.username);
    return writes;
  }
}
