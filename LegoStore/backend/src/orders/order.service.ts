import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lego } from 'src/lego/Lego.entity';
// import { Param } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from './Order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Lego)
    private readonly legoRepository: Repository<Lego>,
  ) {}

  async getByUserId(userId: number): Promise<Lego[]> {
    const order = await this.orderRepository.findOne({
      where: { userId },
      relations: ['legos'],
    });

    if (!order) {
      return [];
    }
    return order.legos ?? [];
  }

  async addNewLegoToOrder(userId: number, legoId: number): Promise<void> {
    let order = await this.orderRepository.findOne({
      where: { userId },
      relations: ['legos'],
    });

    if (!order) {
      order = this.orderRepository.create({
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

    const alreadyInOrder = order.legos.some((item) => item.legoId === legoId);

    if (!alreadyInOrder) {
      order.legos.push(lego);
    }

    await this.orderRepository.save(order);
  }

  async deleteLegoFromOrder(userId: number, legoId: number): Promise<void> {
    const order = await this.orderRepository.findOne({
      where: { userId },
      relations: ['legos'],
    });

    if (!order) {
      // no order, nothing to remove
      return;
    }

    // filter out the lego
    order.legos = order.legos.filter((item) => item.legoId !== legoId);

    // save updated order
    await this.orderRepository.save(order);
  }
}
