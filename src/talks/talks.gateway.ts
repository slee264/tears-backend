import { UseGuards, Request } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  ConnectedSocket
} from '@nestjs/websockets';
import { Server, Socket } from "socket.io";
import socketioJwt from 'socketio-jwt';

import { WsJwtAuthGuard } from '../auth/ws-jwt-auth.guard';

const botName = 'TEAR bot';

@UseGuards(WsJwtAuthGuard)
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true
  },
})
export class TalksGateway{

  @WebSocketServer()
  server: Server;

  formatMessage(username: string, message: string): any{
    return {
      username,
      message,
      time: Date().toLocaleString()
    }
  }

  @SubscribeMessage('connection')
  handleConnection(@ConnectedSocket() client: Socket, @Request() req): any{
    client.emit('connect_message', this.formatMessage(botName, 'Welcome to TEARtalk!'));
    client.broadcast.emit('message', this.formatMessage(botName, 'A user has joined the chat'));
  }

  @SubscribeMessage('disconnect')
  handleDisconnect(@ConnectedSocket() client: Socket): void{
    this.server.emit('message', this.formatMessage(botName, 'A user has left the chat.'));
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket, @Request() req): void{
    this.server.emit('message', this.formatMessage('USER', message));
  }
}
