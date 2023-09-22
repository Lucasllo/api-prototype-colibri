import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/create-auth.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  login(loginAuthDto: LoginAuthDto) {
    return this.authRepository.login(loginAuthDto);
  }

  checkToken(token: string) {
    return this.authRepository.checkToken(token);
  }
}
