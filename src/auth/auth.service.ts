import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InvalidCredentialsException } from './auth.exceptions';

@Injectable()
export class AuthService {
  removeFromTokenCache(token: any) {
    throw new Error('Method not implemented.');
  }
  revokeAccessToken(token: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService, // private readonly cacheService: CacheService,
  ) {}

  async signIn(username, pass) {
    const user = await this.usersService.findOne(username);
    if (!user || user.password !== pass) {
      throw new InvalidCredentialsException();
    }

    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  //   removeFromTokenCache(token: any) {
  //     throw new Error('Method not implemented.');
  //   }
  //   revokeAccessToken(token: any) {}
}

// async login(user: any) {
//   const payload = { username: user.username, sub: user.userId };
//   return {
//     access_token: this.jwtService.sign(payload),
//   };
// }
