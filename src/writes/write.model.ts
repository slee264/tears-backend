import * as mongoose from 'mongoose';

export const WriteSchema = new mongoose.Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  lastEdited: {type: Date, required: true}
});

export interface Write extends mongoose.Document{
  id: string;
  username: string;
  title: string;
  content: string;
  lastEdited: Date;
}
