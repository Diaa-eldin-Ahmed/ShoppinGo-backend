import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ enum: ['Admin', 'Teacher', 'Student'] })
  @IsNotEmpty()
  @IsString()
  @IsEnum(['Admin', 'Teacher', 'Student'], { message: 'use correct role' })
  role: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  gender: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: string;
}
