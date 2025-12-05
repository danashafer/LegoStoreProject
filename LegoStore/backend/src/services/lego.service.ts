import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lego } from 'src/entities/Lego.entity';
// import { Param } from '@nestjs/common';
import { Repository } from 'typeorm';

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

  async addNewLego(lego: Lego): Promise<Lego> {
    console.log('inside lego service, saving lego:');
    console.log(lego);
    const addedLego = await this.legoRepository.save(lego);
    return addedLego;
  }

  async deleteLego(id: number): Promise<void> {
    console.log('deleting lego');

    await this.legoRepository.delete(id);
  }
}
