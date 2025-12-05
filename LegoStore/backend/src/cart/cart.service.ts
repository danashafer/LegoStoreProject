import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/cart/Cart.entity';
import { Lego } from 'src/lego/Lego.entity';
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

  async getByUserId(userId: number): Promise<Lego[]> {
    const cart = await this.cartRepository.findOne({
      where: { userId },
      relations: ['legos'],
    });

    if (!cart) {
      return [];
    }
    return cart.legos ?? [];
  }

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

  async deleteLegoFromCart(userId: number, legoId: number): Promise<void> {
    const cart = await this.cartRepository.findOne({
      where: { userId },
      relations: ['legos'],
    });

    if (!cart) {
      // no cart, nothing to remove
      return;
    }

    // filter out the lego
    cart.legos = cart.legos.filter((item) => item.legoId !== legoId);

    // save updated cart
    await this.cartRepository.save(cart);
  }
}
