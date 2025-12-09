import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LegoController } from 'src/lego/lego.controller';
import { Lego } from 'src/lego/Lego.entity';
import { LegoService } from 'src/lego/lego.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lego])],
  controllers: [LegoController],
  providers: [LegoService],
})
export class LegoModule {}
