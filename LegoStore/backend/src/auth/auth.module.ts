import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import Module from 'module';
import { AuthController } from 'src/auth/auth.controller';
import { User } from 'src/entities/User.entity';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { LocalStartegy } from './strategies/local.strategy';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStartegy],
})
export class AuthModule {}
