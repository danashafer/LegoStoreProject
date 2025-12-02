import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from 'src/auth/auth.controller';
import { User } from 'src/entities/User.entity';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UserService } from 'src/services/user.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
