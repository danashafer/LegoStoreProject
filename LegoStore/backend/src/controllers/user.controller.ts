import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { User } from 'src/entities/User.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getById/:id')
  getById(@Param('id') id: number): Promise<User> {
    return this.userService.getById(id);
  }
}
