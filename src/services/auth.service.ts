import { LoginAuthDto } from '../dto/auth/create-auth.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthRepository } from '../repositorys/auth.repository';
import { RecoverPasswordAuthDto } from 'src/dto/auth/recover-password -auth.dto';
import { CreatePessoaDto } from 'src/dto/pessoa/create-pessoa.dto';
import { Veiculo } from 'src/entities/veiculo.entity';
import { Pessoa } from 'src/entities/pessoa.entity';
import * as bcrypt from 'bcrypt';
import { UpdateLocalizacaoPessoaDto } from 'src/dto/pessoa/updateLocalizacao-pessoa.dto';

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

  async create(createPessoaDto: CreatePessoaDto) {
    createPessoaDto.senha = await bcrypt.hash(
      createPessoaDto.senha,
      await bcrypt.genSalt(),
    );

    const pessoa: Pessoa = {
      id: null,
      ...createPessoaDto,
      ativo: true,
      role: 1,
      veiculo: JSON.parse(JSON.stringify(new Veiculo())),
      CNH: '',
      termos: true,
      CHNImagem: '',
      CLRVImagem: '',
      perfilImagem: '',
      antecedentesImagem: '',
      online: false,
      dataCadastro: new Date(),
      localizacao: new UpdateLocalizacaoPessoaDto(),
    };

    return this.authRepository.create(pessoa);
  }

  validaCodigo(codigo: string, passwordCode: string, usuario) {
    if (codigo != passwordCode) {
      throw new BadRequestException('Codigo invalido');
    }

    return this.authRepository.createToken(usuario);
  }
}
