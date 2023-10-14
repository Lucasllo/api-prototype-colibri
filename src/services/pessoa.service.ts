import { UpdatePessoaDto } from './../dto/pessoa/update-pessoa.dto';
import { GetPessoaDto } from './../dto/pessoa/get-pessoa.dto';
import { Injectable } from '@nestjs/common';
import { CreatePessoaDto } from '../dto/pessoa/create-pessoa.dto';
import { PessoaRepository } from '../repositorys/pessoa.repository';
import * as firebase from 'firebase-admin';
import * as bcrypt from 'bcrypt';
import { Pessoa } from '../entities/pessoa.entity';
import { Veiculo } from 'src/entities/veiculo.entity';
import { VeiculoPessoaDto } from 'src/dto/pessoa/veiculo-pessoa.dto';

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
      perfilImagem: '',
      online: false,
      dataCadastro: new Date(),
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

  async getUser(user): Promise<GetPessoaDto> {
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

  async updateVeiculo(id: number, updateVeiculoDto: VeiculoPessoaDto) {
    const updateVeiculoPessoa = {
      veiculo: JSON.parse(JSON.stringify(updateVeiculoDto)),
    };

    return this.pessoarepository.update(id, updateVeiculoPessoa);
  }

  async updateImage(id: number, tipo: string, nome: string) {
    const updateImagemPessoa = {
      [tipo]: nome,
    };

    return this.pessoarepository.update(id, updateImagemPessoa);
  }

  async remove(id: string) {
    const desativa = { ativo: false };

    return this.pessoarepository.remove(id, desativa);
  }
}
