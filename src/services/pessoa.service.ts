import { UpdatePessoaDto } from './../dto/pessoa/update-pessoa.dto';
import { GetPessoaDto } from './../dto/pessoa/get-pessoa.dto';
import { Injectable } from '@nestjs/common';
import { CreatePessoaDto } from '../dto/pessoa/create-pessoa.dto';
import { PessoaRepository } from '../repositorys/pessoa.repository';
import * as firebase from 'firebase-admin';
import * as bcrypt from 'bcrypt';
import { Pessoa } from '../entities/pessoa.entity';

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
      veiculo: '',
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

  async getUser(user: Pessoa): Promise<GetPessoaDto> {
    const userDto: GetPessoaDto = {
      id: user.id,
      nome: user.nome,
      cpf: user.cpf,
      email: user.email,
      telefone: user.telefone,
    };
    return userDto;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    return this.pessoarepository.update(id, updatePessoaDto);
  }

  async remove(id: string) {
    const desativa = { ativo: false };
    return this.pessoarepository.remove(id, desativa);
  }
}
