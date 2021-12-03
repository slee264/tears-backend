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
    console.log('message received by the server')
    this.server.emit('message', message);
  }
}
