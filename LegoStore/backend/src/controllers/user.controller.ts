import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { User } from 'src/entities/User.entity';
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
    return this.userService.findOne(req.user.id);
  }
}
