import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  SetMetadata,
  BadGatewayException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from 'src/users/dto/sign-In.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

export const IS_PUBLIC_KEY = 'isPublic';
export function SkipAuth() {
  return SetMetadata(IS_PUBLIC_KEY, true);
}

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @SkipAuth()
  @Post('login')
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 201 })
  @ApiBadRequestResponse({ type: BadGatewayException })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @SkipAuth()
  @Get('public')
  publicRoute() {
    return 'This is a public route';
  }
}
