import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WritesModule } from './writes/writes.module';

@Module({
  imports: [WritesModule, MongooseModule.forRoot('mongodb+srv://leethfc11:g2kAZX3HNA716XdX@cluster0.5exec.mongodb.net/tears-db?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
