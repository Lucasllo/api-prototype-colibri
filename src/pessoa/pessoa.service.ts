import { Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { PessoaRepository } from './pessoa.repository';
import * as firebase from 'firebase-admin';
@Injectable()
export class PessoaService {
  repository = new PessoaRepository();

  create(createPessoaDto: CreatePessoaDto) {
    const pessoa = {
      ...createPessoaDto,
      ativo: false,
      dataCadastro: new Date(),
    };
    return this.repository.create(pessoa);
  }

  findAll() {
    const lista: Promise<firebase.firestore.DocumentData[]> =
      this.repository.getAll();
    lista.then((pessoa) =>
      pessoa.map((pessoa) => {
        pessoa.dataCadastro = new Date(pessoa.dataCadastro?.seconds * 1000);
      }),
    );
    return lista;
  }

  findOne(id: string) {
    return this.repository.getUser(id);
  }

  update(id: string, updatePessoaDto: UpdatePessoaDto) {
    return this.repository.update(id, updatePessoaDto);
  }

  remove(id: string) {
    const desativa = { ativo: false };
    return this.repository.remove(id, desativa);
  }
}
