import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import config from '../../config';
import { ConfigType } from '@nestjs/config';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // se coloca un ejemplo de un strategy de nest por si se queiere validar un jwt
      secretOrKey: configService.jwtSecret,
    });
  }
  validate(payload: PayloadToken) {
    return payload;
  }
}
