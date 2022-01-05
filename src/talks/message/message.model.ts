import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema<Message>({
  conversationId: {
    type: String
  },
  sender: {
    type: String
  },
  text: {
    type: String
  },
}, {timestamps: true});

export interface Message extends mongoose.Document{
  id: string;
  conversationId: string;
  sender: string;
  text: string;
}
