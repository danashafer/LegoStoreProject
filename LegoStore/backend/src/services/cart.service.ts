import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entities/Cart.entity';
import { Lego } from 'src/entities/Lego.entity';
// import { Param } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Lego)
    private readonly legoRepository: Repository<Lego>,
  ) {}

  async addNewLegoToCart(userId: number, legoId: number): Promise<void> {
    let cart = await this.cartRepository.findOne({
      where: { userId },
      relations: ['legos'],
    });

    if (!cart) {
      cart = this.cartRepository.create({
        userId,
        legos: [],
      });
    }

    const lego = await this.legoRepository.findOne({
      where: { legoId },
    });

    if (!lego) {
      throw new Error('Lego not found');
    }

    const alreadyInCart = cart.legos.some((item) => item.legoId === legoId);

    if (!alreadyInCart) {
      cart.legos.push(lego);
    }

    await this.cartRepository.save(cart);
  }
}
