import { Socket } from 'socket.io';
import { WsAuthGuard } from './ws.auth.guard';

export type SocketIOMiddleware = {
  (socket: Socket, next: (err?: any) => void): void;
};

export const socketIOMiddleware = (): SocketIOMiddleware => {
  return async (client, next) => {
    try {
      await WsAuthGuard.validateToken(client);
      next();
    } catch (error) {
      next(error);
    }
  };
};
