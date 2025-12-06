import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Lego } from 'src/lego/Lego.entity';
import { OrderService } from './order.service';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getMyOrders(@Req() req) {
    const userId = req.user.id;
    return this.orderService.getOrdersByUser(userId);
  }

  @Post()
  async createOrder(@Req() req) {
    return await this.orderService.createOrderFromCart(req.user.id);
  }

  //   @UseGuards(JwtAuthGuard)
  //   @Post('/:legoId')
  //   async addNewLegoToOrder(
  //     @Req() req,
  //     @Param('legoId', ParseIntPipe) legoId: number,
  //   ): Promise<void> {
  //     console.log('adding to order');
  //     await this.orderService.addNewLegoToOrder(req.user.id, legoId);
  //   }

  //   @UseGuards(JwtAuthGuard)
  //   @Delete('/:legoId')
  //   deleteLegoFromOrder(
  //     @Req() req,
  //     @Param('legoId', ParseIntPipe) legoId: number,
  //   ): Promise<void> {
  //     return this.orderService.deleteLegoFromOrder(req.user.id, legoId);
  //   }
}
