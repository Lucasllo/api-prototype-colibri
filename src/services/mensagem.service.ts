import { CreateMensagemDto } from '../dto/mensagem/create-mensagem.dto';
import { Injectable } from '@nestjs/common';
import { UpdateMensagemDto } from '../dto/mensagem/update-mensagem.dto';
import { MensagemRepository } from '../repositorys/mensagem.repository';
import * as firebase from 'firebase-admin';

@Injectable()
export class MensagemService {
  constructor(private readonly mensagemRepository: MensagemRepository) {}

  create(createMensagemDto: CreateMensagemDto, id: number) {
    return this.mensagemRepository.create(createMensagemDto, id);
  }

  findAll() {
    const lista: Promise<firebase.firestore.DocumentData[]> =
      this.mensagemRepository.getAll();
    lista.then((mensagem) =>
      mensagem.map((mensagem) => {
        mensagem.data = new Date(mensagem.data?.seconds * 1000);
      }),
    );
    return lista;
  }

  findAllByUser(userId: number) {
    const lista: Promise<firebase.firestore.DocumentData[]> =
      this.mensagemRepository.getAllByUser(userId);
    lista.then((mensagem) =>
      mensagem.map((mensagem) => {
        mensagem.data = new Date(mensagem.data?.seconds * 1000);
      }),
    );
    return lista;
  }

  findOne(id: string) {
    return this.mensagemRepository.getMensagem(id);
  }

  update(id: number, updateMensagemDto: UpdateMensagemDto) {
    return this.mensagemRepository.update(id, updateMensagemDto);
  }

  remove(id: number) {
    const desativa = { ativo: false };
    return this.mensagemRepository.remove(id, desativa);
  }
}
