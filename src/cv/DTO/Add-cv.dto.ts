import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
export class AddCvDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(30)
  @Max(60)
  age: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  cin: number;

  @IsNotEmpty()
  job: string;

  @IsOptional()
  path: string;
}
