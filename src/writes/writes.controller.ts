import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { WritesService } from './writes.service';

@Controller('writes')
export class WritesController {
  constructor(private writesService: WritesService) {}

  @Post()
  async addWrite(@Body('title') writeTitle: string, @Body('body') writeBody: string) {
    const generatedId = await this.writesService.insertWrite(writeTitle, writeBody);
    return {id: generatedId };
  }

  @Get()
  async getAllWrites() {
    const writes = await this.writesService.getAllWrites();
    return writes;
  }

  @Get(':writeId')
  async getWrite(@Param('writeId') writeId: string) {
    const write = await this.writesService.getSingleWrite(writeId);
    return write;
  }

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
