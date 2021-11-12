import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Write } from './write.model';

@Injectable()
export class WritesService{
  private writes: Write[] = [];

  constructor(
    @InjectModel('Write') private readonly writeModel: Model<Write>
  ){}

  async insertWrite(title: string, content: string) {
    const newWrite = new this.writeModel({title, content});
    const result = await newWrite.save();
    console.log(result);
    return 'writeId';
  }

  getAllWrites() {
    return [...this.writes];
  }

  getSingleWrite(writeId: string) {
    const write = this.findWrite(writeId)[0];
    return {...write};
  }

  updateWrite(writeId: string, writeTitle: string, writeContent: string) {
    const [write, index] = this.findWrite(writeId);
    const updatedWrite = {...write};

    if (writeTitle) {
      updatedWrite.title = writeTitle;
    }

    if (writeContent) {
      updatedWrite.content = writeContent;
    }

    this.writes[index] = updatedWrite;
  }

  removeWrite(writeId: string) {
    const [_, index] = this.findWrite(writeId);
    this.writes.splice(index, 1);
  }

  private findWrite(writeId: string): [Write, number] {
    const writeIndex = this.writes.findIndex(write => write.id == writeId);
    const write = this.writes[writeIndex];
    if(!write) {
      throw new NotFoundException('Could not find write.');
    }

    return [write, writeIndex];
  }
}
