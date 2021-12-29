import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Write } from './write.model';

@Injectable()
export class WritesService{
  constructor(
    @InjectModel('Write') private readonly writeModel: Model<Write>
  ) {}

  async insertWrite(title: string, body: string, username: string) {
    const newWrite = new this.writeModel({username, title, content: body, lastEdited: new Date()});
    const result = await newWrite.save();
    return result.id as string;
  }

  async getAllWritesBy(username: string) {
    const writes = await this.writeModel.find({ username }).exec();
    return writes.map((write) => ({id: write.id, username: write.username, title: write.title, body: write.content, lastEdited: write.lastEdited}));
  }

  async getSingleWriteBy(writeId: string) {
    const write = await this.findWrite(writeId);
    return {id: write.id, username: write.username, title: write.title, body: write.content};
  }

  async updateWrite(writeId: string, writeTitle: string, writeContent: string) {
    const updatedWrite = await this.findWrite(writeId);

    if (writeTitle) {
      updatedWrite.title = writeTitle;
    }

    if (writeContent) {
      updatedWrite.content = writeContent;
    }
    updatedWrite.lastEdited = new Date();
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
