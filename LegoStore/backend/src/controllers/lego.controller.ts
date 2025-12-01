import { Controller, Get } from '@nestjs/common';
import { LegoService } from 'src/services/lego.service';
import { Lego } from 'src/entities/Lego.entity';

@Controller('lego')
export class LegoController {
  constructor(private readonly legoService: LegoService) {}

  @Get()
  getById(): Promise<Lego[]> {
    return this.legoService.getAll();
  }
}
