import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/User.entity';
// import { Param } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    console.log('finding by email');
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
      select: ['userId', 'username', 'email', 'password', 'role', 'avatarKey'],
    });

    console.log(user);

    return user;
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: {
        userId: id,
      },
    });
    console.log('check for user with user avatar');
    console.log(user);

    return user;
  }

  async create(data: {
    username: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    avatarKey?: string;
  }) {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }
}
