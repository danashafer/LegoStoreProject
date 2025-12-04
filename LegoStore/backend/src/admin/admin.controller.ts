import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Lego } from 'src/entities/Lego.entity';
import { LegoService } from 'src/services/lego.service';

@Controller()
export class AdminController {
  constructor(private readonly legoService: LegoService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin/add-new-lego')
  async addNewLego(lego: Lego) {
    await this.legoService.addNewLego(lego);
  }
}
