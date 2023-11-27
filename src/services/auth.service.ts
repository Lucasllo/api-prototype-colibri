import { LoginAuthDto } from '../dto/auth/create-auth.dto';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from '../repositorys/auth.repository';
import { RecoverPasswordAuthDto } from 'src/dto/auth/recover-password -auth.dto';
import { CreatePessoaDto } from 'src/dto/pessoa/create-pessoa.dto';
import { Veiculo } from 'src/entities/veiculo.entity';
import { Pessoa } from 'src/entities/pessoa.entity';
import * as bcrypt from 'bcrypt';
import { Documentos } from 'src/entities/documentos.entity';
import { Localizacao } from 'src/entities/localizacao.entity';
import { JwtService } from '@nestjs/jwt';
import { Modalidade } from 'src/entities/modalidade.entity';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'user';

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    loginAuthDto: LoginAuthDto,
  ): Promise<{ token: string; type: string }> {
    let result;
    const pessoa: Pessoa = await this.authRepository.login(loginAuthDto);

    const documentosValidados =
      pessoa.documentos.CHNImagemValidado &&
      pessoa.documentos.CLRVImagemValidado &&
      pessoa.documentos.antecedentesImagemValidado &&
      pessoa.documentos.perfilImagemValidado;

    // logica de verificacao de documentos;
    // alterar retorno para {token: ..., type: 'valid', 'semi valid'}

    if (pessoa.telefoneValidado && documentosValidados) {
      result = this.createToken(pessoa, 'valid');
    } else if (pessoa.telefoneValidado && !documentosValidados) {
      result = this.createToken(pessoa, 'semiValid');
    } else {
      throw new UnauthorizedException('Usuario não validado.');
    }

    return result;
  }

  checkToken(token: string) {
    return this.checkInToken(token);
  }

  recuperaSenha(recoverPasswordAuthDto: RecoverPasswordAuthDto) {
    const codigo = Math.floor(1000 + Math.random() * 9000);
    const result = this.authRepository.recoverPassword(recoverPasswordAuthDto);

    // enviar codigo

    return this.createTokenRecoverPassword(codigo, result);
  }

  async create(createPessoaDto: CreatePessoaDto) {
    createPessoaDto.senha = await bcrypt.hash(
      createPessoaDto.senha,
      await bcrypt.genSalt(),
    );

    const pessoa: Pessoa = {
      id: null,
      ...createPessoaDto,
      emailValidado: false,
      telefoneValidado: false,
      role: 1,
      veiculo: JSON.parse(JSON.stringify(new Veiculo())),
      CNH: '',
      termos: true,
      documentos: JSON.parse(JSON.stringify(new Documentos())),
      online: false,
      dataCadastro: new Date(),
      localizacao: JSON.parse(JSON.stringify(new Localizacao())),
      modalidade: JSON.parse(JSON.stringify(new Modalidade())),
      tempoOnline: 0,
      dataOnline: null,
    };

    return this.createToken(
      await this.authRepository.create(pessoa),
      'semiValid',
    );
  }

  validaCodigo(codigo: string, passwordCode: string, usuario) {
    if (codigo != passwordCode) {
      throw new BadRequestException('Codigo invalido');
    }

    return this.createToken(usuario, 'semiValid');
  }

  private createToken(pessoa, type) {
    return {
      token: this.jwtService.sign(
        {
          nome: pessoa.nome,
          email: pessoa.email,
        },
        {
          expiresIn: '7 days',
          subject: JSON.stringify({
            type: String(type),
            usuario: String(pessoa.id),
          }),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
      type: type,
    };
  }

  private checkInToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.audience,
        issuer: this.issuer,
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private createTokenRecoverPassword(codigo, pessoa) {
    return {
      token: this.jwtService.sign(
        {
          codigo: codigo,
        },
        {
          expiresIn: '1 day',
          subject: JSON.stringify({
            codigo: String(codigo),
            usuario: String(pessoa.id),
          }),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }
}
