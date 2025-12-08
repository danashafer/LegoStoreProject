import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/cart/Cart.entity';
import { Lego } from 'src/lego/Lego.entity';
// import { Param } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CartItem } from './CartItem.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Lego)
    private readonly legoRepository: Repository<Lego>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  async getByUserId(userId: number): Promise<CartItem[]> {
    const cart = await this.cartRepository.findOne({
      where: { userId },
      relations: ['cartItems', 'cartItems.lego'],
    });

    if (!cart) {
      return [];
    }

    console.log(cart);
    return cart.cartItems ?? [];
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

  async getOrCreateCart(userId: number) {
    let cart = await this.cartRepository.findOne({
      where: { user: { userId } },
      relations: ['cartItems', 'cartItems.lego'],
    });

    if (!cart) {
      cart = this.cartRepository.create({
        user: { userId } as any,
        cartItems: [],
      });
      cart = await this.cartRepository.save(cart);
    }

    return cart;
  }

  async addItem(userId: number, legoId: number, quantity = 1) {
    const cart = await this.getOrCreateCart(userId);

    const lego = await this.legoRepository.findOne({
      where: { legoId },
    });

    if (!lego) {
      throw new NotFoundException('Lego not found');
    }

    if (lego.amount < quantity) {
      throw new BadRequestException('Not enough stock');
    }

    // reduce stock in store
    lego.amount -= quantity;
    await this.legoRepository.save(lego);

    // find existing CartItem
    let item = cart.cartItems.find((i) => i.lego.legoId === legoId);

    if (item) {
      item.amount += quantity;
      await this.cartItemRepository.save(item);
    } else {
      item = this.cartItemRepository.create({
        cart,
        lego,
        amount: quantity,
      });
      await this.cartItemRepository.save(item);
      cart.cartItems.push(item);
    }

    return cart.cartItems ?? [];
  }

  async decrementItem(userId: number, legoId: number) {
    const cart = await this.getOrCreateCart(userId);

    const item = cart.cartItems.find((i) => i.lego.legoId === legoId);
    if (!item) {
      return cart;
    }

    const lego = await this.legoRepository.findOne({
      where: { legoId },
    });

    if (!lego) {
      throw new NotFoundException('Lego not found');
    }

    // give one back to store
    lego.amount += 1;
    await this.legoRepository.save(lego);

    if (item.amount > 1) {
      item.amount -= 1;
      await this.cartItemRepository.save(item);
    } else {
      // quantity was 1, remove item from cart
      await this.cartItemRepository.remove(item);
      cart.cartItems = cart.cartItems.filter(
        (i) => i.cartItemId !== item.cartItemId,
      );
    }

    return cart.cartItems ?? [];
  }

  async removeItem(userId: number, legoId: number) {
    const cart = await this.getOrCreateCart(userId);

    console.log('removing item from cart' + userId);
    console.log(legoId);

    const item = cart.cartItems.find((i) => i.lego.legoId === legoId);
    if (!item) {
      return cart;
    }

    const lego = await this.legoRepository.findOne({
      where: { legoId },
    });

    if (!lego) {
      throw new NotFoundException('Lego not found');
    }

    // restore all units to store
    lego.amount += item.amount;
    await this.legoRepository.save(lego);

    await this.cartItemRepository.remove(item);
    cart.cartItems = cart.cartItems.filter(
      (i) => i.cartItemId !== item.cartItemId,
    );

    return cart;
  }
}
