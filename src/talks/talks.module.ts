import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TalkSchema } from './talk.model';
import { TalksController } from './talks.controller';
import { TalksGateway } from './talks.gateway';
import { TalksService } from './talks.service';

import { ConversationSchema } from './conversation/conversation.model';
import { ConversationsController } from './conversation/conversations.controller';
import { ConversationsService } from './conversation/conversations.service';

import { MessageSchema } from './message/message.model';
import { MessagesController } from './message/messages.controller';
import { MessagesService } from './message/messages.service';

import { UserSchema } from '../users/user.model';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Talk', schema: TalkSchema}]),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    MongooseModule.forFeature([{name: 'Conversation', schema: ConversationSchema}]),
    MongooseModule.forFeature([{name: 'Message', schema: MessageSchema}]),
  ],
  controllers: [TalksController, ConversationsController, MessagesController],
  providers: [TalksService, TalksGateway, ConversationsService, MessagesService, UsersService]
})

export class TalksModule {}
