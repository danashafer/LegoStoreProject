import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Cart } from 'src/cart/Cart.entity';
import { Lego } from 'src/lego/Lego.entity';
import { CartService } from 'src/cart/cart.service';
import { CartItem } from './CartItem.entity';
import { AddToCartDto } from './dto/cartItem.dto';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartControler {
  constructor(private readonly cartService: CartService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getByUserId(@Req() req): Promise<CartItem[]> {
    const legosInCart = await this.cartService.getByUserId(req.user.id);
    console.log(legosInCart);
    return legosInCart;
  }

  @Post('item')
  async addItem(@Req() req, @Body() body: AddToCartDto) {
    const userId = req.user.id;
    const quantity = body.amount ?? 1;
    console.log(userId);

    return this.cartService.addItem(userId, body.legoId, quantity);
  }

  @Patch('item/:legoId/decrement')
  async decrementItem(@Req() req, @Param('legoId') legoId: string) {
    const userId = req.user.id;
    const legoIdNumber = Number(legoId);

    return this.cartService.decrementItem(userId, legoIdNumber);
  }

  @Delete('item/:legoId')
  async removeItem(@Req() req, @Param('legoId') legoId: string) {
    const userId = req.user.id;
    const legoIdNumber = Number(legoId);

    return this.cartService.removeItem(userId, legoIdNumber);
  }
}
