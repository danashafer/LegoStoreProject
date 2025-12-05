import { Controller, Get, Req, Post, UseGuards, Body } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Lego } from 'src/entities/Lego.entity';
import { LegoService } from 'src/services/lego.service';

@Controller()
export class AdminController {
  constructor(private readonly legoService: LegoService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('admin/add-new-lego')
  async addNewLego(@Body() lego: Lego): Promise<Lego> {
    console.log('adding new lego');
    console.log(lego);

    const addedLego = await this.legoService.addNewLego(lego);

    return addedLego;
  }
}
