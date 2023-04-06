import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsAuthGuard } from 'src/auth/ws.auth.guard';
import { socketIOMiddleware } from 'src/auth/ws.mw';

@UseGuards(WsAuthGuard)
@WebSocketGateway({ namespace: 'book' })
export class BooksGateway {
  @WebSocketServer()
  server: Server;

  afterInit(client: Socket) {
    client.use(socketIOMiddleware() as any);
  }

  @SubscribeMessage('share')
  onShare(@MessageBody() data: any) {
    this.server.emit('share', data);
  }

  emitShare(data: any) {
    this.server.emit('share', data);
  }
}
