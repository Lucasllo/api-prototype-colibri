import { Injectable } from '@nestjs/common';
import { CreateCarteiraDto } from './dto/create-carteira.dto';
import { UpdateCarteiraDto } from './dto/update-carteira.dto';
import { CarteiraRepository } from './carteira.repository';
import * as firebase from 'firebase-admin';

@Injectable()
export class CarteiraService {
  constructor(private readonly carteiraRepository: CarteiraRepository) {}

  async create(createCarteiraDto: CreateCarteiraDto, userId) {
    const carteira = { ...createCarteiraDto, pessoaId: userId };
    return this.carteiraRepository.create(carteira);
  }

  async findAll() {
    return this.carteiraRepository.getAll();
  }

  async findAllByUser(userId: number) {
    const lista: Promise<firebase.firestore.DocumentData[]> =
      this.carteiraRepository.findAllByUser(userId);

    return lista;
  }

  async findOne(id: string) {
    return this.carteiraRepository.getUser(id);
  }

  async update(id: string, updateCarteiraDto: UpdateCarteiraDto) {
    return this.carteiraRepository.update(id, updateCarteiraDto);
  }

  async remove(id: string) {
    const desativa = { ativo: false };
    return this.carteiraRepository.remove(id, desativa);
  }
}
