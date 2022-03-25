import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRequestDto, UserResponseDto } from './dto/user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }
  
  async createUser(data: UserRequestDto): Promise<UserResponseDto> {
    const {username, password} = data
    let user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      throw new Error(`User with ${username} already exists`);
    }
    user = this.userRepository.create({ username, password });
    await this.userRepository.save(user);
    return user.toResponseObject();
  }

  async getUser(username: string): Promise<UserEntity> {
    let user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUser(id: string, data: UserRequestDto): Promise<string> {
    let user = await this.userRepository.find({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepository.update({ id }, data);
    return 'User Updated';
  }
}
