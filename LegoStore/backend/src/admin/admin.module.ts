import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lego } from 'src/lego/Lego.entity';
import { LegoService } from 'src/lego/lego.service';
import { AdminController } from './admin.controller';
import { Order } from 'src/orders/Order.entity';
import { OrderService } from 'src/orders/order.service';
import { Cart } from 'src/cart/Cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lego, Order,Cart])],
  controllers: [AdminController],
  providers: [LegoService, OrderService],
})
export class AdminModule {}
