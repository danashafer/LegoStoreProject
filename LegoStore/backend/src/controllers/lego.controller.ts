import { Controller, Get, Param } from '@nestjs/common';
import { LegoService } from './services/lego.service.ts';

@Controller()
export class AppController {
  constructor(private readonly legoService: LegoService) {}

  @Get('findById/:id')
  getById(@Param('id') id: string): Lego {
    return this.legoService.getById(id);
  }
}
