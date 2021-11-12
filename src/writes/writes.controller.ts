import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { WritesService } from './writes.service';

@Controller('writes')
export class WritesController {
  constructor(private writesService: WritesService) {}

  @Post()
  addWrite(@Body('title') writeTitle: string, @Body('content') writeContent: string): any {
    const generatedId= this.writesService.insertWrite(writeTitle, writeContent);
    return {id: generatedId };
  }

  @Get()
  getAllWrites() {
    return this.writesService.getAllWrites();
  }

  @Get(':writeId')
  getWrite(@Param('writeId') writeId: string) {
    return this.writesService.getSingleWrite(writeId);
  }

  @Patch(':writeId')
  updateWrite(@Param('writeId') writeId: string, @Body('title') writeTitle: string, @Body('content') writeContent: string) {
    this.writesService.updateWrite(writeId, writeTitle, writeContent);
    return null;
  }

  @Delete(':writeId')
  removeWrite(@Param('writeId') writeId: string) {
    this.writesService.removeWrite(writeId);
    return null;
  }
}
