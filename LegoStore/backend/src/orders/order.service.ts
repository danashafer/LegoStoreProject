import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lego } from 'src/lego/Lego.entity';
// import { Param } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from './Order.entity';
import { Cart } from 'src/cart/Cart.entity';
import { OrderItem } from './orderItem.entity';
import { OrderStatus } from './orderStatus.enum';
import { CartItem } from 'src/cart/CartItem.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Lego)
    private readonly legoRepository: Repository<Lego>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  async getOrdersByUser(userId: number): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      where: { userId },
      relations: ['items', 'items.lego'],
      order: { createdAt: 'DESC' },
    });

    return orders;
  }

  async createOrderFromCart(userId: number): Promise<Order> {
    // load cart with items and legos
    const cart = await this.cartRepository.findOne({
      where: { userId },
      relations: ['cartItems', 'cartItems.lego'],
    });

    if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
      throw new Error('Cart is empty');
    }

    // build order items from cart items
    const items = cart.cartItems.map((cartItem) => {
      const item = new OrderItem();
      item.lego = cartItem.lego;
      item.amount = cartItem.amount; // use amount from cart
      return item;
    });

    const total = items.reduce(
      (sum, item) => sum + Number(item.lego.price) * item.amount,
      0,
    );

    const order = new Order();
    order.userId = userId;
    order.items = items;
    order.totalPrice = String(total);

    const savedOrder = await this.orderRepository.save(order);

    // clear cart after order
    // remove cart items from DB and from the cart object
    await this.cartItemRepository.remove(cart.cartItems);
    cart.cartItems = [];
    await this.cartRepository.save(cart);

    return savedOrder;
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['items', 'items.lego', 'user'],
    });
  }

  async updateStatus(orderId: number, status: OrderStatus) {
    const order = await this.orderRepository.findOneBy({ orderId });
    console.log('deleting order');

    if (!order) {
      console.log(' order not found');

      throw new NotFoundException('Order not found');
    }

    order.status = status;
    console.log(status);
    return this.orderRepository.save(order);
  }
}
