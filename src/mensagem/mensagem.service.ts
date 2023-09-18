import { Injectable } from '@nestjs/common';
import { CreateMensagemDto } from './dto/create-mensagem.dto';
import { UpdateMensagemDto } from './dto/update-mensagem.dto';
import { MensagemRepository } from './mensagem.repository';
import * as firebase from 'firebase-admin';

@Injectable()
export class MensagemService {
  repository = new MensagemRepository();

  create(createMensagemDto: CreateMensagemDto) {
    return this.repository.create(createMensagemDto);
  }

  findAll() {
    const lista: Promise<firebase.firestore.DocumentData[]> =
      this.repository.getAll();
    lista.then((mensagem) =>
      mensagem.map((mensagem) => {
        mensagem.data = new Date(mensagem.data?.seconds * 1000);
      }),
    );
    return lista;
  }

  findOne(id: string) {
    return this.repository.getUser(id);
  }

  update(id: string, updateMensagemDto: UpdateMensagemDto) {
    return this.repository.update(id, updateMensagemDto);
  }

  remove(id: string) {
    const desativa = { ativo: false };
    return this.repository.remove(id, desativa);
  }
}
