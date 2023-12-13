import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing.');
    }

    const [bearerKeyword, token] = authHeader.split(' ');
    if (bearerKeyword !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization format.');
    }

    try {
      this.jwtService.verify(token);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
