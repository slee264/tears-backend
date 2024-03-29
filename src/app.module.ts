import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WritesModule } from './writes/writes.module';
import { TalksModule } from './talks/talks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TalksModule, WritesModule, MongooseModule.forRoot(process.env.DB_HOST + '://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@cluster0.5exec.mongodb.net/tears-db?retryWrites=true&w=majority'), AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
