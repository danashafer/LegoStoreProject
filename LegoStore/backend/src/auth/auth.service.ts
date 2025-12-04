import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { compare } from 'bcrypt';
import { UserService } from 'src/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    console.log('entered validate user');
    const user = await this.userService.findByEmail(email);
    console.log('the user is: ');
    console.log(user);
    console.log(user?.password);
    if (!user) throw new UnauthorizedException('User not found');
    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { user };
  }

  login(user: { userId: number; role: 'admin' | 'user' }) {
    const payload: AuthJwtPayload = {
      sub: user.userId,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }
}
