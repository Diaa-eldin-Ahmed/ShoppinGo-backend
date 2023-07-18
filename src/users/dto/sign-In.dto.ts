import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'diaa', description: 'The name of the user' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'changeme',
    description: 'use strong password',
  })
  password: string;
}
