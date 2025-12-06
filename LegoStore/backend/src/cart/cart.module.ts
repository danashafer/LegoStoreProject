import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartControler } from 'src/cart/cart.controller';
import { Cart } from 'src/cart/Cart.entity';
import { Lego } from 'src/lego/Lego.entity';
import { User } from 'src/users/User.entity';
import { CartService } from 'src/cart/cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Lego, User])],
  controllers: [CartControler],
  providers: [CartService],
})
export class CartModule {}
