import * as mongoose from 'mongoose';

export const TalkSchema = new mongoose.Schema<Talk>({
  host: {
    username: {type: String, required: true},
    name: {type: String, required: false, default: ''},
  },
  room_id: {type: String, required: false},
  time_created: {type: Date, required: true},
  members: {type: [
    {
      user_id: {type: String, required: true},
      username: {type: String, required: true},
      name: {type: String, required: false}
    }
  ],
    required: false},
});

export interface Talk extends mongoose.Document{
  id: string;
  host: {username: string, name: string};
  room_id: string;
  time_created: Date;
  members: [{user_id: string, username: string, name: string}];
}
