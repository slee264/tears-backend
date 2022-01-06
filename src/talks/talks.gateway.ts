import { UseGuards } from '@nestjs/common';
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
    origin: [process.env.DOMAIN, process.env.DOMAIN_2],
    credentials: true
  },
})
export class TalksGateway{
  @WebSocketServer()
  server: Server;

  users: {user_id: string, socket_id: string}[] = [];

  addUser(user_id: string, socket_id: string){
    !this.users.some(user => user.user_id === user_id) && this.users.push({user_id, socket_id});
  }

  removeUser(socket_id: string){
    this.users = this.users.filter(user => user.socket_id !== socket_id);
  }

  getUser(user_id: string){
    return this.users.find(user => user.user_id === user_id);
  }

  formatMessage(sender_id: string, message: string): any{
    return {
      sender_id,
      message,
      time: Date().toLocaleString()
    }
  }

  @SubscribeMessage('connection')
  handleConnection(@ConnectedSocket() client: Socket): any{
    this.server.emit('welcome', this.formatMessage(botName, 'Welcome to TEARtalk!'));
    client.broadcast.emit('message', this.formatMessage(botName, 'A user has joined the chat'));
  }

  @SubscribeMessage('disconnect')
  handleDisconnect(@ConnectedSocket() client: Socket): void{
    this.removeUser(client.id);
    this.server.emit("getUsers", this.users);
  }

  @SubscribeMessage('addUser')
  handleAddUser(@ConnectedSocket() client: Socket, @MessageBody('user_id') user_id: string){
    this.addUser(user_id, client.id);
    this.server.emit("getUsers", this.users);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: {sender_id: string, receiver_id: string, text: string}): void{
    const user = this.getUser(message.receiver_id);
    this.server.to(user.socket_id).emit('message', this.formatMessage(message.sender_id, message.text));
  }
}
