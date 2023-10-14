import { UpdateCarteiraDto } from '../dto/carteira/update-carteira.dto';
import { Injectable } from '@nestjs/common';
import { CreateCarteiraDto } from '../dto/carteira/create-carteira.dto';
import { CarteiraRepository } from '../repositorys/carteira.repository';
import * as firebase from 'firebase-admin';

@Injectable()
export class CarteiraService {
  constructor(private readonly carteiraRepository: CarteiraRepository) {}

  async create(createCarteiraDto: CreateCarteiraDto, userId: number) {
    createCarteiraDto = {
      ...createCarteiraDto,
      endereco: JSON.parse(JSON.stringify(createCarteiraDto.endereco)),
    };
    return this.carteiraRepository.create(createCarteiraDto, userId);
  }

  async findAll() {
    return this.carteiraRepository.getAll();
  }

  async findAllByUser(userId: number) {
    const lista: Promise<firebase.firestore.DocumentData[]> =
      this.carteiraRepository.findAllByUser(userId);

    return lista;
  }

  // async findqOne(id: string) {
  //   return this.carteiraRepository.getCarteira(id);
  // }

  async update(id: number, updateCarteiraDto: UpdateCarteiraDto) {
    return this.carteiraRepository.update(id, updateCarteiraDto);
  }

  async remove(id: string) {
    const desativa = { ativo: false };
    return this.carteiraRepository.remove(id, desativa);
  }
}
