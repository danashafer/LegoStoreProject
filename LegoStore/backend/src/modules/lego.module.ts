import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LegoController } from 'src/controllers/lego.controller';
import { Lego } from 'src/entities/Lego.entity';
import { LegoService } from 'src/services/lego.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lego])],
  controllers: [LegoController],
  providers: [LegoService],
})
export class LegoModule {}
