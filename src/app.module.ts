import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WritesModule } from './writes/writes.module';

@Module({
  imports: [WritesModule, MongooseModule.forRoot(process.env.DB_HOST + '://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@cluster0.5exec.mongodb.net/tears-db?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
