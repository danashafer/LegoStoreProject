import { Controller, Get } from '@nestjs/common';
import { LegoService } from 'src/lego/lego.service';
import { Lego } from 'src/lego/Lego.entity';

@Controller('legos')
export class LegoController {
  constructor(private readonly legoService: LegoService) {}

  @Get()
  getById(): Promise<Lego[]> {
    return this.legoService.getAllForStore();
  }
}
