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
import { Cart } from 'src/cart/Cart.entity';
import { Lego } from 'src/lego/Lego.entity';
import { CartService } from 'src/cart/cart.service';

@Controller('carts')
export class CartControler {
  constructor(private readonly cartService: CartService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getByUserId(@Req() req): Promise<Lego[]> {
    const legosInCart = await this.cartService.getByUserId(req.user.id);
    console.log(legosInCart);
    return legosInCart;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:legoId')
  async addNewLegoToCart(
    @Req() req,
    @Param('legoId', ParseIntPipe) legoId: number,
  ): Promise<void> {
    console.log('adding to cart');
    await this.cartService.addNewLegoToCart(req.user.id, legoId);
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete('/:legoId')
  deleteLegoFromCart(
    @Req() req,
    @Param('legoId', ParseIntPipe) legoId: number,
  ): Promise<void> {
    return this.cartService.deleteLegoFromCart(req.user.id, legoId);
  }
}
