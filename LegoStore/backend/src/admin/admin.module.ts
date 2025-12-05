import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lego } from 'src/lego/Lego.entity';
import { LegoService } from 'src/lego/lego.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Lego])],
  controllers: [AdminController],
  providers: [LegoService],
})
export class AdminModule {}
