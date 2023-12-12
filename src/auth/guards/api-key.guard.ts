import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ProfileUserClientService } from '../../modules/service/user.client.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly jwtService: ProfileUserClientService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    console.log(
      '🚀 ~ file: api-key.guard.ts:19 ~ ApiKeyGuard ~ request:',
      request,
    );
    const authHeader = request.header('Authorization');
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing.');
    }
    const [bearerKeyword, token] = authHeader.split(' ');
    if (bearerKeyword !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization format.');
    }
    try {
      const decodedToken = this.jwtService.verifyJWT(token);
      console.log(
        '🚀 ~ file: api-key.guard.ts:29 ~ ApiKeyGuard ~ decodedToken:',
        decodedToken,
      );
      // request. = decodedToken;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
