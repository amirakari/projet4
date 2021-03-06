import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserSubscribeDto } from './DTO/user.subscribe.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginCredentialsDto } from './DTO/login.credentials.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtservice: JwtService,
  ) {}

  async subscribe(userdata: UserSubscribeDto): Promise<Partial<UserEntity>> {
    const user = this.userRepository.create({
      ...userdata,
    });
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    try {
      await this.userRepository.save(user);
    } catch (e) {
      throw new ConflictException(
        `le username et le password doit etre unique`,
      );
    }
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    };
  }

  async login(credentials: LoginCredentialsDto) {
    const { username, password } = credentials;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username =:username or user.email =:username', {
        username,
      })
      .getOne();
    if (!user) {
      throw new NotFoundException(`username ou password erronée`);
    }
    const hashedPassword = await bcrypt.hash(password, user.salt);
    if (hashedPassword === user.password) {
      const payload = {
        username,
        email: user.email,
        role: user.role,
      };
      const jwt = await this.jwtservice.sign(payload);
      return {
      'access_token' : jwt
      };
    } else {
      throw new NotFoundException(`username ou password erronée`);
    }
  }
}
