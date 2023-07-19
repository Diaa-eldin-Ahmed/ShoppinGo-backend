import { UnauthorizedException } from '@nestjs/common';

export class InvalidCredentialsException extends UnauthorizedException {
  constructor() {
    super('Invalid username or password');
  }
}

export class ExpiredTokenException extends UnauthorizedException {
  constructor() {
    super('Token has expired');
  }
}
