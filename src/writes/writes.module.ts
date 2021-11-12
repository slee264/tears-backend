import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WritesController } from './writes.controller';
import { WritesService } from './writes.service';
import { WriteSchema } from './write.model';
@Module({
  imports: [MongooseModule.forFeature([{name: 'Write', schema: WriteSchema}])],
  controllers: [WritesController],
  providers: [WritesService]
})
export class WritesModule {}
