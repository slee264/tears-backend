import { Module } from '@nestjs/common';

import { TalksController } from './talks.controller';
import { TalksGateway } from './talks.gateway';

@Module({
  controllers: [TalksController],
  providers: [TalksGateway]
})

export class TalksModule {}
