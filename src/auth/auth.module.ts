import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'kkhJaEB3NBE$4Kf746nCQm!e#ySLJ!dP',
      // signOptions: { expiresIn: '7 days' }, usado para definir globalmente quanto tempo o jwt vai valer
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  exports: [AuthRepository],
})
export class AuthModule {}
