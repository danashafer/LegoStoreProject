import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from 'src/auth/auth.controller';
import { User } from 'src/entities/User.entity';
import jwtConfig from './config/jwt.config';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UserService } from 'src/services/user.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

// import { PassportModule } from '@nestjs/passport';

// @Module({
//   imports: [
//     PassportModule,
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       inject: [jwtConfig.KEY],
//       useFactory: (config: ConfigType<typeof jwtConfig>) => ({
//         secret: config.secret,
//         signOptions: { expiresIn: config.signOptions.expiresIn },
//       }),
//     }),
//     ConfigModule,
//   ],
//   providers: [JwtStrategy, AuthService],
//   exports: [AuthService],
// })
// export class AuthModule {}
