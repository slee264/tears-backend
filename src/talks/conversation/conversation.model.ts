import * as mongoose from 'mongoose';

export const ConversationSchema = new mongoose.Schema<Conversation>({
  members: {
    type: [String],
  }
});

export interface Conversation extends mongoose.Document{
  id: string;
  members: [String];
}
