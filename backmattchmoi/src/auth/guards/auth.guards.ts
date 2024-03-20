import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log('Token Received:', token);
    if (!token) {
      throw new NotFoundException();
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log('Payload:', payload);
      request['user'] = payload;
    } catch (error) {
      console.error('Error verifying token:', error);
      throw new NotFoundException();
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    console.log('Authorization Header:', authHeader);

    if (!authHeader) {
      return undefined;
    }

    const [type, token] = authHeader.split(' ');
    console.log('Token Type:', type);

    return type === 'Bearer' ? token : undefined;
  }
}
