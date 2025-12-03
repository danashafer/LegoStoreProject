import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
// import { Param } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
      select: ['userId', 'username', 'email', 'password'],
    });

    return user;
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: {
        userId: id,
      },
    });

    return user;
  }
}
