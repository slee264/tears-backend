import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TalksController } from './talks.controller';
import { TalksGateway } from './talks.gateway';
import { TalksService } from './talks.service';

import { ConversationSchema } from './conversation/conversation.model';
import { ConversationsController } from './conversation/conversations.controller';
import { ConversationsService } from './conversation/conversations.service';

import { MessageSchema } from './message/message.model';
import { MessagesController } from './message/messages.controller';
import { MessagesService } from './message/messages.service';


import { TalkSchema } from './talk.model';
import { UserSchema } from '../users/user.model';


@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Talk', schema: TalkSchema}]),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    MongooseModule.forFeature([{name: 'Conversation', schema: ConversationSchema}]),
    MongooseModule.forFeature([{name: 'Message', schema: MessageSchema}]),
  ],
  controllers: [ConversationsController, MessagesController],
  providers: [TalksGateway, TalksService, ConversationsService, MessagesService]
})

export class TalksModule {}
