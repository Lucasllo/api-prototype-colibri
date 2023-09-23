import { Injectable } from '@nestjs/common';
import { CreateCorridaDto } from './dto/create-corrida.dto';
import { UpdateCorridaDto } from './dto/update-corrida.dto';
import { CorridaRepository } from './corrida.repository';
import * as firebase from 'firebase-admin';

@Injectable()
export class CorridaService {
  constructor(private readonly corridaRepository: CorridaRepository) {}

  create(createCorridaDto: CreateCorridaDto) {
    return this.corridaRepository.create(createCorridaDto);
  }

  findAll() {
    const lista: Promise<firebase.firestore.DocumentData[]> =
      this.corridaRepository.getAll();
    lista.then((corrida) =>
      corrida.map((corrida) => {
        corrida.data = new Date(corrida.data?.seconds * 1000);
        corrida.horaInicial = new Date(corrida.horaInicial?.seconds * 1000);
        corrida.horaFinal = new Date(corrida.horaFinal?.seconds * 1000);
      }),
    );
    return lista;
  }

  findOne(id: string) {
    return this.corridaRepository.getUser(id);
  }

  update(id: string, updateCorridaDto: UpdateCorridaDto) {
    return this.corridaRepository.update(id, updateCorridaDto);
  }

  remove(id: string) {
    const desativa = { ativo: false };
    return this.corridaRepository.remove(id, desativa);
  }
}
