import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TalksGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleEvent(@MessageBody() message: string): void {
    console.log(message);
    this.server.emit('message', 'this is a message from server');
  }
}
