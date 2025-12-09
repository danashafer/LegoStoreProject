import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lego } from 'src/lego/Lego.entity';
// import { Param } from '@nestjs/common';
import { MoreThan, Repository } from 'typeorm';
import { CreateLegoDto } from './dto/create-lego.dto';

@Injectable()
export class LegoService {
  constructor(
    @InjectRepository(Lego)
    private readonly legoRepository: Repository<Lego>,
  ) {}


  async getAllForStore(): Promise<Lego[]> {
    return this.legoRepository.find({
      where: { amount: MoreThan(0) },
    });
  }

  async addNewLego(dto: CreateLegoDto): Promise<Lego> {
    const lego = this.legoRepository.create({
      name: dto.name,
      description: dto.description,
      price: dto.price,
      amount: dto.amount,
      imageKey: dto.imageKey,
    });

    return this.legoRepository.save(lego);
  }

  async deleteLego(id: number) {
    const lego = await this.legoRepository.findOne({
      where: { legoId: id },
    });

    if (!lego) {
      throw new NotFoundException('Lego not found');
    }

    lego.amount = 0;

    return this.legoRepository.save(lego);
  }
}
