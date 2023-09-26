import { Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { PessoaRepository } from './pessoa.repository';
import * as firebase from 'firebase-admin';
import * as bcrypt from 'bcrypt';
import { Pessoa } from './entities/pessoa.entity';
import { GetPessoaDto } from './dto/get-pessoa.dto';

@Injectable()
export class PessoaService {
  constructor(private readonly pessoarepository: PessoaRepository) {}

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
