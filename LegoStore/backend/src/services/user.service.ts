import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
// import { Param } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class LegoService {
  constructor(
    @InjectRepository(User)
    private readonly legoRepository: Repository<User>,
  ) {}

  async getById(id: number): Promise<User> {
    const user: User  = await this.legoRepository.findOne({
        where{
            user_id: id
        }
    });

    return user;
  }
}