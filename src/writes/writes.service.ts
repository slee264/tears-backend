import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Write } from './write.model';

@Injectable()
export class WritesService{
  constructor(
    @InjectModel('Write') private readonly writeModel: Model<Write>
  ) {}

  async insertWrite(title: string, content: string) {
    const newWrite = new this.writeModel({username: 'temp_user', title, content});
    const result = await newWrite.save();
    return result.id as string;
  }

  async getAllWrites() {
    const writes = await this.writeModel.find().exec();
    return writes.map((write) => ({id: write.id, username: write.username, title: write.title, content: write.content}));
  }

  async getSingleWrite(writeId: string) {
    const write = await this.findWrite(writeId);
    return {id: write.id, username: write.username, title: write.title, content: write.content};
  }

  async updateWrite(writeId: string, writeTitle: string, writeContent: string) {
    const updatedWrite = await this.findWrite(writeId);

    if (writeTitle) {
      updatedWrite.title = writeTitle;
    }

    if (writeContent) {
      updatedWrite.content = writeContent;
    }

    updatedWrite.save();
  }

  async removeWrite(writeId: string) {
    const result = await this.writeModel.deleteOne({_id: writeId}).exec();
    if(result.deletedCount === 0) {
      throw new NotFoundException('Could not find write.');
    }
  }

  private async findWrite(writeId: string): Promise<Write> {
    let write;
    try{
      write = await this.writeModel.findById(writeId);
    } catch(error){
      throw new NotFoundException('Could not find write.');
    }

    if(!write) {
      throw new NotFoundException('Could not find write.');
    }

    return write;
  }
}
