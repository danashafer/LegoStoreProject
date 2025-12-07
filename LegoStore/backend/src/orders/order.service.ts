import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lego } from 'src/lego/Lego.entity';
// import { Param } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from './Order.entity';
import { Cart } from 'src/cart/Cart.entity';
import { OrderItem } from './orderItem.entity';
import { OrderStatus } from './orderStatus.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Lego)
    private readonly legoRepository: Repository<Lego>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
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
    const cart = await this.cartRepository.findOne({
      where: { userId },
      relations: ['legos'],
    });

    if (!cart || cart.legos.length === 0) {
      throw new Error('Cart is empty');
    }

    const items = cart.legos.map((lego) => {
      const item = new OrderItem();
      item.lego = lego;
      item.quantity = 1;
      return item;
    });

    const total = items.reduce(
      (sum, item) => sum + Number(item.lego.price) * item.quantity,
      0,
    );

    const order = new Order();
    order.userId = userId;
    order.items = items;
    order.totalPrice = String(total);

    const savedOrder = await this.orderRepository.save(order);

    // clear the cart after order
    cart.legos = [];
    await this.cartRepository.save(cart);

    return savedOrder;
  }
  async getAllOrders(): Promise<Order[]> {
    const allOrders: Order[] = await this.orderRepository.find();

    return allOrders;
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
