import { UpdatePessoaDto } from './../dto/pessoa/update-pessoa.dto';
import { GetPessoaDto } from './../dto/pessoa/get-pessoa.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePessoaDto } from '../dto/pessoa/create-pessoa.dto';
import { PessoaRepository } from '../repositorys/pessoa.repository';
import * as bcrypt from 'bcrypt';
import { Pessoa } from '../entities/pessoa.entity';
import { Veiculo } from 'src/entities/veiculo.entity';
import { VeiculoPessoaDto } from 'src/dto/pessoa/veiculo-pessoa.dto';
import { ChangePasswordAuthDto } from 'src/dto/auth/change-password-auth.dto';
import { UpdateLocalizacaoPessoaDto } from 'src/dto/pessoa/updateLocalizacao-pessoa.dto';
import { UpdateOnlinePessoaDto } from 'src/dto/pessoa/updateOnline-pessoa.dto';
import { Documentos } from 'src/entities/documentos.entity';
import { Localizacao } from 'src/entities/localizacao.entity';
import { Modalidade } from 'src/entities/modalidade.entity';
import { UpdateModalidadePessoaDto } from '../dto/pessoa/updateModalidade-pessoa.dto';
import { VeiculoTipoPessoaDto } from 'src/dto/pessoa/veiculoTipo-pessoa.dto';

@Injectable()
export class PessoaService {
  constructor(private readonly pessoarepository: PessoaRepository) {}

  async create(createPessoaDto: CreatePessoaDto): Promise<any> {
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

    return this.pessoarepository.create(pessoa);
  }

  findAll() {
    const lista = this.pessoarepository.getAll();

    lista.then((pessoa) =>
      pessoa.map((pessoa) => {
        pessoa.dataCadastro = new Date(
          (pessoa.dataCadastro as any).seconds * 1000,
        );
      }),
    );

    return lista;
  }

  async findOne(id: number) {
    return this.pessoarepository.getUser(id);
  }

  async getUser(user: Pessoa): Promise<GetPessoaDto> {
    const userDto: GetPessoaDto = {
      id: user.id,
      nome: user.nome,
      cpf: user.cpf,
      email: user.email,
      telefone: user.telefone,
      veiculo: user.veiculo,
    };

    return userDto;
  }

  async updateDados(id: number, updatePessoaDto: UpdatePessoaDto) {
    return this.pessoarepository.update(id, updatePessoaDto);
  }

  updateDadosTempoUso(id: number, updateTempoUso: { tempoOnline: number }) {
    return this.pessoarepository.update(id, updateTempoUso);
  }

  async updateLocalizacao(
    id: number,
    updateLocalizacaoPessoaDto: UpdateLocalizacaoPessoaDto,
  ) {
    let x: number;
    const usuario: Pessoa = await this.pessoarepository.getUser(id);

    if (usuario.dataOnline != null) {
      x =
        Math.abs(
          new Date((usuario.dataOnline as any).seconds * 1000).valueOf() -
            new Date().valueOf(),
        ) / 36e5;
      usuario.tempoOnline = usuario.tempoOnline + Number(x.toFixed(2));
    }

    if (usuario.tempoOnline >= 12) {
      usuario.online = false;
    }

    const updateLocalizacao = {
      tempoOnline: usuario.tempoOnline,
      online: usuario.online,
      localizacao: updateLocalizacaoPessoaDto,
    };
    return this.pessoarepository.update(id, updateLocalizacao);
  }

  async updateOnline(id: number, updateOnlinePessoaDto: UpdateOnlinePessoaDto) {
    const usuario: Pessoa = await this.pessoarepository.getUser(id);
    let x: number;

    if (usuario.tempoOnline >= 12) {
      throw new BadRequestException('Tempo de uso chegou ao limite');
    }

    if (usuario.dataOnline != null && !updateOnlinePessoaDto.online) {
      x =
        Math.abs(
          new Date((usuario.dataOnline as any).seconds * 1000).valueOf() -
            new Date().valueOf(),
        ) / 36e5;
      usuario.tempoOnline = usuario.tempoOnline + Number(x.toFixed(2));
    }

    if (updateOnlinePessoaDto.online) {
      usuario.dataOnline = new Date();
    } else {
      usuario.dataOnline = null;
    }

    const updateOnline = {
      dataOnline: usuario.dataOnline,
      tempoOnline: usuario.tempoOnline,
      online: updateOnlinePessoaDto,
    };

    return this.pessoarepository.update(id, updateOnline);
  }

  async updateVeiculo(id: number, updateVeiculoDto: VeiculoPessoaDto) {
    const usuario: Pessoa = await this.pessoarepository.getUser(id);
    const updateVeiculoPessoa = {
      veiculo: { ...usuario.veiculo, ...updateVeiculoDto },
    };

    return this.pessoarepository.update(id, updateVeiculoPessoa);
  }

  async updateTipoVeiculo(
    id: number,
    updateTipoVeiculoDto: VeiculoTipoPessoaDto,
  ) {
    const usuario: Pessoa = await this.pessoarepository.getUser(id);
    const updateVeiculoPessoa = {
      veiculo: { ...usuario.veiculo, ...updateTipoVeiculoDto },
    };

    return this.pessoarepository.update(id, updateVeiculoPessoa);
  }

  async updateModalidade(
    id: number,
    updateModalidadePessoaDto: UpdateModalidadePessoaDto,
  ) {
    const usuario: Pessoa = await this.pessoarepository.getUser(id);
    const updateModalidadePessoa = {
      modalidade: {
        ...usuario.modalidade,
        ...updateModalidadePessoaDto,
      },
    };

    return this.pessoarepository.update(id, updateModalidadePessoa);
  }

  async updateSenha(id: number, changePasswordAuthDto: ChangePasswordAuthDto) {
    if (changePasswordAuthDto.senha != changePasswordAuthDto.confirmaSenha) {
      throw new BadRequestException('Senha invalida');
    }

    const updatePessoaDto = {
      senha: changePasswordAuthDto.senha,
    };

    return this.pessoarepository.update(id, updatePessoaDto);
  }

  async updateImage(id: number, tipo: string, nome: string) {
    const usuario: Pessoa = await this.pessoarepository.getUser(id);

    const tipoValidado = `${tipo}Validado`;
    const updateImagemPessoa = {
      documentos: {
        ...usuario.documentos,
        [tipo]: nome,
        [tipoValidado]: false,
      },
    };

    return this.pessoarepository.update(id, updateImagemPessoa);
  }

  async remove(id: number) {
    const desativa = new Pessoa();

    return this.pessoarepository.remove(id, desativa);
  }
}
