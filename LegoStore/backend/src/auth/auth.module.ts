import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import Module from 'module';
import { AuthController } from 'src/auth/auth.controller';
import { User } from 'src/entities/User.entity';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStartegy],
})
export class AuthModule {}
