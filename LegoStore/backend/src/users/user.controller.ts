import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { User } from 'src/users/User.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get('getById/:id')
  // getById(@Param('id') id: number): Promise<User> {
  //   return this.userService.getById(id);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req): Promise<User | null> {
    console.log(req.user);
    return this.userService.findOne(req.user.id);
  }
}
