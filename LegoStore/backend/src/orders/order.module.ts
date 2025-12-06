import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lego } from 'src/lego/Lego.entity';
import { User } from 'src/users/User.entity';
import { Order } from './Order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Lego, User])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
