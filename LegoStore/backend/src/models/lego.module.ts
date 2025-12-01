import { Module } from '@nestjs/common';
import { LegoController } from 'src/controllers/lego.controller';
import { LegoService } from 'src/services/lego.service';

@Module({
  imports: [],
  controllers: [LegoController],
  providers: [LegoService],
})
export class LegoModule {}
