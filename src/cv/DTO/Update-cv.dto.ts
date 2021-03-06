import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
export class UpdateCvDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(30)
  @Max(60)
  age: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  cin: number;

  @IsOptional()
  job: string;

  @IsOptional()
  path: string;
}
