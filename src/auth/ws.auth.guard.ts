import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class WsAuthGuard implements CanActivate {
  static jwtService: JwtService;

  constructor(private jwtService: JwtService) {
    WsAuthGuard.jwtService = jwtService;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient();
    await WsAuthGuard.validateToken(client);
    return true;
  }

  static async validateToken(client: Socket) {
    const token = WsAuthGuard.extractTokenFromHeader(client);
    if (!token) {
      throw new Error('No authentication token provided');
    }

    try {
      const payload = await WsAuthGuard.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      client['user'] = payload;
    } catch (error) {
      throw new Error('Invalid authentication token');
    }
  }

  static extractTokenFromHeader(client: Socket): string | undefined {
    const [type, token] =
      client.handshake?.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
