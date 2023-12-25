import { LoginAuthDto } from '../dto/auth/create-auth.dto';
import { Controller, Post, Body, UseGuards, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { Roles } from '../decorators/roles.decorator';
import { AuthService } from '../services/auth.service';
import { Role } from '../enum/role.enum';
import { RoleGuard } from '../guard/role.guard';
import { RecoverPasswordAuthDto } from '../dto/auth/recover-password -auth.dto';
import { PasswordCode } from '../decorators/passwordCode.decorator';
import { User } from '../decorators/user.decorator';
import { Pessoa } from '../entities/pessoa.entity';
import { CreatePessoaDto } from '../dto/pessoa/create-pessoa.dto';

@Roles(Role.Admin)
@UseGuards(RoleGuard)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(
    @Body() loginAuthDto: LoginAuthDto,
  ): Promise<{ token: string; type: string }> {
    return this.authService.login(loginAuthDto);
  }

  @Public()
  @Post('recuperaSenha')
  recuperaSenha(@Body() recoverPasswordAuthDto: RecoverPasswordAuthDto) {
    return this.authService.recuperaSenha(recoverPasswordAuthDto);
  }

  @Public()
  @Post('create')
  create(@Body() createPessoaDto: CreatePessoaDto) {
    return this.authService.create(createPessoaDto);
  }

  @Roles(Role.Recover)
  @ApiBearerAuth('access-token')
  @Post('validaCodigo/:codigo')
  validaCodigo(
    @Param('codigo') codigo: string,
    @User() usuario: Pessoa,
    @PasswordCode() passwordCode: string,
  ) {
    return this.authService.validaCodigo(codigo, passwordCode, usuario);
  }
}
