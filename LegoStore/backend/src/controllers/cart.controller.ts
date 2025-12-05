import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { Cart } from 'src/entities/Cart.entity';
import { Lego } from 'src/entities/Lego.entity';

@Controller('carts')
export class CartControoler {
  constructor(private readonly cartService: CartService) {}

  @Get(':id')
  getByUserId(@Param('id', ParseIntPipe) id: number): Promise<Cart> {
    return this.cartService.getByUserId(id);
  }

  @Put(':id')
  addNewLegoToCart(
    @Body() lego: Lego,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Cart> {
    return this.cartService.addNewLegoToCart(lego, id);
  }

  @Delete(':userId/:legoId')
  deleteLegoFromCart(
    @Body() lego: Lego,
    @Param('userId', ParseIntPipe) userId: number,
    @Param('legoId', ParseIntPipe) legoId: number,
  ): Promise<Cart> {
    return this.cartService.deleteLegoFromCart(legoId, userId);
  }
}
