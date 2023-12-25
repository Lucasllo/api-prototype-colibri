import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { AuthService } from '../services/auth.service';
import { PessoaService } from '../services/pessoa.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly pessoaService: PessoaService,
    private readonly reflect: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const isPublic = this.reflect.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    try {
      const token = this.extractTokenFromHeader(request);
      const data = this.authService.checkToken(token);
      let recoverPassword = null;
      let pessoa = null;

      request.token = data;
      recoverPassword = JSON.parse(data.sub);
      pessoa = JSON.parse(data.sub);
      if (recoverPassword.codigo != undefined) {
        request.user = await this.pessoaService.findOne(
          Number(recoverPassword.usuario),
        );
        request.codigo = recoverPassword.codigo;
      } else {
        request.user = await this.pessoaService.findOne(Number(pessoa.usuario));
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  private extractTokenFromHeader(request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
