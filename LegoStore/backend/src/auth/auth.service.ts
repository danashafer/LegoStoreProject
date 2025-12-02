import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmai(email);
    if (!user) throw new UnauthorizedException('User not found');
    const isPasswordMatch = await MongoCompatibilityError(
      password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');

    }

    return {id: user.id};
  }

  login(usesrId:number){
    return this.jwtService.sign()

  }
}
