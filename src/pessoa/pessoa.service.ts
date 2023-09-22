import { Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { PessoaRepository } from './pessoa.repository';
import * as firebase from 'firebase-admin';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PessoaService {
  private repository = new PessoaRepository();

  async create(createPessoaDto: CreatePessoaDto) {
    createPessoaDto.senha = await bcrypt.hash(
      createPessoaDto.senha,
      await bcrypt.genSalt(),
    );

    const pessoa = {
      ...createPessoaDto,
      ativo: false,
      role: 1,
      veiculo: '',
      CNH: '',
      perfilImage: '',
      online: false,
      dataCadastro: new Date(),
    };

    return this.repository.create(pessoa);
  }

  async findAll() {
    const lista: Promise<firebase.firestore.DocumentData[]> =
      this.repository.getAll();
    lista.then((pessoa) =>
      pessoa.map((pessoa) => {
        pessoa.dataCadastro = new Date(pessoa.dataCadastro?.seconds * 1000);
      }),
    );
    return lista;
  }

  async findOne(id: number) {
    return this.repository.getUser(id);
  }

  async update(id: string, updatePessoaDto: UpdatePessoaDto) {
    return this.repository.update(id, updatePessoaDto);
  }

  async remove(id: string) {
    const desativa = { ativo: false };
    return this.repository.remove(id, desativa);
  }
}
