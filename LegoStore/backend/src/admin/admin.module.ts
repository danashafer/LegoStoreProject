import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lego } from 'src/entities/Lego.entity';
import { LegoService } from 'src/services/lego.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Lego])],
  controllers: [AdminController],
  providers: [LegoService],
})
export class LegoModule {}
