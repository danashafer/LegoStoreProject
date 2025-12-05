import { Controller, Get, Req, Post, UseGuards, Body, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Lego } from 'src/lego/Lego.entity';
import { LegoService } from 'src/lego/lego.service';

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

  @Delete('admin/delete-lego/:id')
  async deleteLego(@Param('id', ParseIntPipe) id: number): Promise<void> {
    console.log('delening lego in controller' + id);
    console.log(id);

    await this.legoService.deleteLego(id);
  }
}
