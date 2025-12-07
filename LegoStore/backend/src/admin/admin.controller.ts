import {
  Controller,
  Get,
  Req,
  Post,
  UseGuards,
  Body,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { CreateLegoDto } from 'src/lego/dto/create-lego.dto';
import { Lego } from 'src/lego/Lego.entity';
import { LegoService } from 'src/lego/lego.service';
import { Order } from 'src/orders/Order.entity';
import { OrderService } from 'src/orders/order.service';

@Controller()
export class AdminController {
  constructor(
    private readonly legoService: LegoService,
    private readonly orderService: OrderService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('admin/add-new-lego')
  async addNewLego(@Body() body: CreateLegoDto): Promise<Lego> {
    console.log('adding new lego');
    console.log(body);

    const addedLego = await this.legoService.addNewLego(body);

    return addedLego;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('admin/delete-lego/:id')
  async deleteLego(@Param('id', ParseIntPipe) id: number): Promise<void> {
    console.log('delening lego in controller' + id);
    console.log(id);

    await this.legoService.deleteLego(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin/orders')
  async getAllOrders(): Promise<Order[]> {
    console.log('getting admin orders');
    return await this.orderService.getAllOrders();
  }
}
