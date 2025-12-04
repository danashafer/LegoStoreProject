import { ExtractJwt, Strategy as JwtStrategyBase } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import * as config from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { AuthJwtPayload } from '../types/auth-jwtPayload';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtStrategyBase, 'jwt') {
  constructor(
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: config.ConfigType<typeof jwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: String(jwtConfiguration.secret),
    });
  }

  validate(payload: AuthJwtPayload) {
    console.log('validating');
    return { id: payload.sub };
  }
}
