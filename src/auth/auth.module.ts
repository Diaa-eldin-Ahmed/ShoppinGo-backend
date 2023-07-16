import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      // secret: process.env.SECRET,
      // secret: 'secret',
      global: true,
      secret: jwtConstants.secret,
      // signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
