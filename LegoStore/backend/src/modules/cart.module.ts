import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartControler } from 'src/controllers/cart.controller';
import { Cart } from 'src/entities/Cart.entity';
import { Lego } from 'src/entities/Lego.entity';
import { User } from 'src/entities/User.entity';
import { CartService } from 'src/services/cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Lego, User])],
  controllers: [CartControler],
  providers: [CartService],
})
export class CartModule {}
