import { UpdatePessoaDto } from './../dto/pessoa/update-pessoa.dto';
import { GetPessoaDto } from './../dto/pessoa/get-pessoa.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePessoaDto } from '../dto/pessoa/create-pessoa.dto';
import { PessoaRepository } from '../repositorys/pessoa.repository';
import * as firebase from 'firebase-admin';
import * as bcrypt from 'bcrypt';
import { Pessoa } from '../entities/pessoa.entity';
import { Veiculo } from 'src/entities/veiculo.entity';
import { VeiculoPessoaDto } from 'src/dto/pessoa/veiculo-pessoa.dto';
import { ChangePasswordAuthDto } from 'src/dto/auth/change-password-auth.dto';
import { UpdateLocalizacaoPessoaDto } from 'src/dto/pessoa/updateLocalizacao-pessoa.dto';
import { UpdateOnlinePessoaDto } from 'src/dto/pessoa/updateOnline-pessoa.dto';

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
      ativo: true,
      role: 1,
      veiculo: JSON.parse(JSON.stringify(new Veiculo())),
      CNH: '',
      termos: true,
      CHNImagem: '',
      CLRVImagem: '',
      antecedentesImagem: '',
      perfilImagem: '',
      online: false,
      dataCadastro: new Date(),
      localizacao: new UpdateLocalizacaoPessoaDto(),
    };

    return this.pessoarepository.create(pessoa);
  }

  async findAll() {
    const lista: Promise<firebase.firestore.DocumentData[]> =
      this.pessoarepository.getAll();

    lista.then((pessoa) =>
      pessoa.map((pessoa) => {
        pessoa.dataCadastro = new Date(pessoa.dataCadastro?.seconds * 1000);
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

  async updateLocalizacao(
    id: number,
    updateLocalizacaoPessoaDto: UpdateLocalizacaoPessoaDto,
  ) {
    const updateLocalizacao = { localizacao: updateLocalizacaoPessoaDto };
    return this.pessoarepository.update(id, updateLocalizacao);
  }

  async updateOnline(id: number, updateOnlinePessoaDto: UpdateOnlinePessoaDto) {
    const updateOnline = { online: updateOnlinePessoaDto };
    return this.pessoarepository.update(id, updateOnline);
  }

  async updateVeiculo(id: number, updateVeiculoDto: VeiculoPessoaDto) {
    const updateVeiculoPessoa = {
      veiculo: JSON.parse(JSON.stringify(updateVeiculoDto)),
    };

    return this.pessoarepository.update(id, updateVeiculoPessoa);
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
    const updateImagemPessoa = {
      [tipo]: nome,
    };

    return this.pessoarepository.update(id, updateImagemPessoa);
  }

  async remove(id: number) {
    let desativa = new Pessoa();
    desativa = { ...desativa, ativo: false };

    return this.pessoarepository.remove(id, desativa);
  }
}
