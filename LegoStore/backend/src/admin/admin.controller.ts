import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Lego } from 'src/entities/Lego.entity';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin/add-new-lego')
  addNewLego(lego: Lego) {
    this.adminService.addNewLego(lego);
  }
}
