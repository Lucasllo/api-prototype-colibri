import { CreateMensagemDto } from '../dto/mensagem/create-mensagem.dto';
import { Injectable } from '@nestjs/common';
import { UpdateMensagemDto } from '../dto/mensagem/update-mensagem.dto';
import { MensagemRepository } from '../repositorys/mensagem.repository';
import * as firebase from 'firebase-admin';

@Injectable()
export class MensagemService {
  constructor(private readonly mensagemRepository: MensagemRepository) {}

  create(createMensagemDto: CreateMensagemDto, id: number) {
    const message = {
      ...createMensagemDto,
      ativo: true,
    };
    return this.mensagemRepository.create(message, id);
  }

  createDocumentsWarning(mensagem: string, type: string, id: number) {
    const message = {
      descricao: mensagem,
      tipo: type,
      data: JSON.stringify(new Date()),
      pessoa: id,
      ativo: true,
    };

    return this.mensagemRepository.create(message, id);
  }

  findAll() {
    const lista: Promise<firebase.firestore.DocumentData[]> =
      this.mensagemRepository.getAll();
    lista.then((mensagem) =>
      mensagem.map((mensagem) => {
        delete mensagem.pessoa;
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
        delete mensagem.pessoa;
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

  remove(id: number, idMensagem: string) {
    const desativa = { ativo: false };
    return this.mensagemRepository.remove(id, desativa, idMensagem);
  }
}
