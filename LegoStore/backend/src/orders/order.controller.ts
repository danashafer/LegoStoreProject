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

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getByUserId(@Req() req): Promise<Lego[]> {
    const legosInOrder = await this.orderService.getByUserId(req.user.id);
    console.log(legosInOrder);
    return legosInOrder;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:legoId')
  async addNewLegoToOrder(
    @Req() req,
    @Param('legoId', ParseIntPipe) legoId: number,
  ): Promise<void> {
    console.log('adding to order');
    await this.orderService.addNewLegoToOrder(req.user.id, legoId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:legoId')
  deleteLegoFromOrder(
    @Req() req,
    @Param('legoId', ParseIntPipe) legoId: number,
  ): Promise<void> {
    return this.orderService.deleteLegoFromOrder(req.user.id, legoId);
  }
}
