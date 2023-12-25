import { UpdateCorridaDto } from '../dto/corrida/update-corrida.dto';
import { Injectable } from '@nestjs/common';
import { CreateCorridaDto } from '../dto/corrida/create-corrida.dto';
import { CorridaRepository } from '../repositorys/corrida.repository';
import * as firebase from 'firebase-admin';
import { QueueService } from './queue.service';
import { AcceptCorridaDto } from 'src/dto/corrida/accept-corrida.dto';

@Injectable()
export class CorridaService {
  constructor(
    private readonly corridaRepository: CorridaRepository,
    private readonly queueService: QueueService,
  ) {}

  async create(createCorridaDto: CreateCorridaDto, userId: number) {
    return this.corridaRepository.create(createCorridaDto, userId);
  }

  async findAll() {
    const lista: Promise<firebase.firestore.DocumentData[]> =
      this.corridaRepository.getAll();
    lista.then((corrida) =>
      corrida.map((corrida) => {
        delete corrida.pessoa;
        corrida.data = new Date(corrida.data?.seconds * 1000);
        corrida.horaInicial = new Date(corrida.horaInicial?.seconds * 1000);
        corrida.horaFinal = new Date(corrida.horaFinal?.seconds * 1000);
      }),
    );
    return lista;
  }

  async findAllByUser(userId: number) {
    const lista: Promise<firebase.firestore.DocumentData[]> =
      this.corridaRepository.findAllByUser(userId);
    lista.then((corrida) =>
      corrida.map((corrida) => {
        delete corrida.pessoa;
        corrida.data = new Date(corrida.data?.seconds * 1000);
        corrida.horaInicial = new Date(corrida.horaInicial?.seconds * 1000);
        corrida.horaFinal = new Date(corrida.horaFinal?.seconds * 1000);
      }),
    );
    return lista;
  }

  async findOne(id: string) {
    return this.corridaRepository.getCorrida(id);
  }

  async update(id: string, updateCorridaDto: UpdateCorridaDto) {
    return this.corridaRepository.update(id, updateCorridaDto);
  }

  async buscarCorrida(user) {
    console.log(user);
    return await this.queueService.PollMessages();
  }

  async aceitarCorrida(acceptCorridaDto: AcceptCorridaDto, userId: number) {
    this.create(acceptCorridaDto.corrida, userId);
    return await this.queueService.DeleteMessagesFromQueue(
      acceptCorridaDto.codigo,
    );
  }
}
