import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { compare } from 'bcrypt';
import { UserService } from 'src/users/user.service';
import { User } from 'src/users/User.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  private googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto): Promise<User> {
    const existing = await this.userService.findByEmail(dto.email);

    if (existing) {
      throw new BadRequestException('Email already in use');
    }

    const passwordHash = await hash(dto.password, 12);

    const user = await this.userService.create({
      username: dto.username,
      email: dto.email,
      password: passwordHash,
      role: 'user',
    });

    return user;
  }

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

  async loginWithGoogle(idToken: string) {
    const ticket = await this.googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      throw new BadRequestException('Google login failed');
    }

    const email = payload.email;
    const username = payload.name ?? email.split('@')[0];

    let user = await this.userService.findByEmail(email);

    if (!user) {
      user = await this.userService.create({
        username,
        email,
        password: '',
        role: 'user',
      });
    }

    const jwtPayload: AuthJwtPayload = {
      sub: user.userId,
      role: user.role,
    };

    const token = this.jwtService.sign(jwtPayload);

    return {
      id: user.userId,
      username: user.username,
      email: user.email,
      role: user.role,
      token,
    };
  }
}
