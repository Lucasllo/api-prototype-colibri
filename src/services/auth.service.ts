import { LoginAuthDto } from '../dto/auth/create-auth.dto';
import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../repositorys/auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  login(loginAuthDto: LoginAuthDto): Promise<{ token: string }> {
    return this.authRepository.login(loginAuthDto);
  }

  checkToken(token: string) {
    return this.authRepository.checkToken(token);
  }
}
