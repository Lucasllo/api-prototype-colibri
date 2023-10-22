import { LoginAuthDto } from '../dto/auth/create-auth.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthRepository } from '../repositorys/auth.repository';
import { RecoverPasswordAuthDto } from 'src/dto/auth/recover-password -auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  login(loginAuthDto: LoginAuthDto): Promise<{ token: string }> {
    return this.authRepository.login(loginAuthDto);
  }

  checkToken(token: string) {
    return this.authRepository.checkToken(token);
  }

  recuperaSenha(recoverPasswordAuthDto: RecoverPasswordAuthDto) {
    return this.authRepository.recoverPassword(recoverPasswordAuthDto);
  }

  validaCodigo(codigo: string, passwordCode: string, usuario) {
    if (codigo != passwordCode) {
      throw new BadRequestException('Codigo invalido');
    }

    return this.authRepository.createToken(usuario);
  }
}
