
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { compare } from 'bcrypt';
import { UserService } from 'src/services/user.service';
import { User } from 'src/entities/User.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    console.log('entered validate user');
    console.log(email);

    const user = await this.userService.findByEmail(email);

    console.log('the user is:');
    console.log(user);
    console.log(user?.password);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // important: return the user object, not { user }
    return user;
  }

  login(user: User) {
    console.log('user in login:', user);
    const payload: AuthJwtPayload = {
      sub: user.userId, // adjust to your field name
      role: user.role, // "admin" | "user"
    };

    return this.jwtService.sign(payload);
  }
}
