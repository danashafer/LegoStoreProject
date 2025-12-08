import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lego } from 'src/lego/Lego.entity';
// import { Param } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateLegoDto } from './dto/create-lego.dto';

@Injectable()
export class LegoService {
  constructor(
    @InjectRepository(Lego)
    private readonly legoRepository: Repository<Lego>,
  ) {}

  async getAll(): Promise<Lego[]> {
    const allLegos: Lego[] = await this.legoRepository.find();

    return allLegos;
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

  async deleteLego(id: number): Promise<void> {
    console.log('deleting lego');

    await this.legoRepository.delete(id);
  }
}
