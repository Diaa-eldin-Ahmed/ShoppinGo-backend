import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginRequest {
  @IsString()
  @ApiProperty({ example: 'eslam@aaib.com' })
  username: string;

  @IsString()
  @ApiProperty({ example: 'EGYPTcountry77' })
  password: string;
}
