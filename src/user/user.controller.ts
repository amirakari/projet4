import { Body, Controller, Post } from '@nestjs/common';
import { UserSubscribeDto } from './DTO/user.subscribe.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { LoginCredentialsDto } from './DTO/login.credentials.dto';

@Controller('user')
export class UserController {
  constructor(private userservice: UserService) {}
  @Post()
  registre(@Body() userData: UserSubscribeDto): Promise<Partial<UserEntity>> {
    return this.userservice.subscribe(userData);
  }
  @Post('login')
  login(@Body() crendentials: LoginCredentialsDto) {
    return this.userservice.login(crendentials);
  }
}
