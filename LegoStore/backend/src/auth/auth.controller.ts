import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const token = this.authService.login(req.user);

    return {
      id: req.user.userId,
      role: req.user.role,
      token,
    };
  }

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const user = await this.authService.register(dto);

    const token = this.authService.login(user);
    console.log('user signin up:');
    console.log(user);

    return {
      id: user.userId,
      username: user.username,
      email: user.email,
      role: user.role,
      avatarKey: user.avatarKey,
      token,
    };
  }

  @Post('google')
  async googleLogin(@Body('idToken') idToken: string) {
    return this.authService.loginWithGoogle(idToken);
  }
}
