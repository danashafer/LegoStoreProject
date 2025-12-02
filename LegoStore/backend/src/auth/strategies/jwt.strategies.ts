import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { AuthJwtPayload } from '../types/auth-jwtPayload';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtConfiguration: ConfigType<typeof jwtConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfiguration.secret,
    });
  }

  validate(payload: AuthJwtPayload) {
    return { id: payload.sub };
  }
}
