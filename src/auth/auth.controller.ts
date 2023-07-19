import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
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
import { InvalidCredentialsException } from './auth.exceptions';

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
  async signIn(@Body() signInDto: SignInDto) {
    try {
      return await this.authService.signIn(
        signInDto.username,
        signInDto.password,
      );
    } catch (error) {
      if (error instanceof InvalidCredentialsException) {
        return `authentication failed: ${error.message}`;
      }
    }
  }

  @Get('profile')
  @ApiBearerAuth('JWT-auth')
  getProfile(@Request() req) {
    return req.user;
  }

  @SkipAuth()
  @Get('public')
  publicRoute() {
    return 'This is a public route';
  }

  @Post('logout')
  async logout(@Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    // Implement the logout logic
    // Revoke the access token associated with the user
    await this.authService.revokeAccessToken(token);
    // Remove the token from the database or cache
    await this.authService.removeFromTokenCache(token);
    // Return a success response
    return { message: 'Logout successful' };
  }
}
