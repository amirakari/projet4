import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class UserSubscribeDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
