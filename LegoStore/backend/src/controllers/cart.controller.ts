import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Cart } from 'src/entities/Cart.entity';
import { Lego } from 'src/entities/Lego.entity';
import { CartService } from 'src/services/cart.service';

@Controller('cart')
export class CartControler {
  constructor(private readonly cartService: CartService) {}

  @Get(':id')
  getByUserId(@Param('id', ParseIntPipe) id: number): Promise<Lego[]> {
    return this.cartService.getByUserId(id);
  }

  @Post(':userId/:legoId')
  async addNewLegoToCart(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('legoId', ParseIntPipe) legoId: number,
  ): Promise<void> {
    await this.cartService.addNewLegoToCart(userId, legoId);
  }

  //   @Delete(':userId/:legoId')
  //   deleteLegoFromCart(
  //     @Body() lego: Lego,
  //     @Param('userId', ParseIntPipe) userId: number,
  //     @Param('legoId', ParseIntPipe) legoId: number,
  //   ): Promise<Cart> {
  //     return this.cartService.deleteLegoFromCart(userId, legoId);
  //   }
}
