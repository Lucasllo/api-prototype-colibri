import { UpdateCarteiraDto } from '../dto/carteira/update-carteira.dto';
import { Injectable } from '@nestjs/common';
import { CreateCarteiraDto } from '../dto/carteira/create-carteira.dto';
import { CarteiraRepository } from '../repositorys/carteira.repository';
import * as firebase from 'firebase-admin';
import { Carteira } from 'src/entities/carteira.entity';

@Injectable()
export class CarteiraService {
  constructor(private readonly carteiraRepository: CarteiraRepository) {}

  async create(createCarteiraDto: CreateCarteiraDto, userId: number) {
    const carteira: Carteira = {
      ...createCarteiraDto,
      endereco: JSON.parse(JSON.stringify(createCarteiraDto.endereco)),
      saldo: 0.0,
      ativo: true,
    };
    return this.carteiraRepository.create(carteira, userId);
  }

  async findAll() {
    return this.carteiraRepository.getAll();
  }

  async findAllByUser(userId: number) {
    const lista: Promise<firebase.firestore.DocumentData[]> =
      this.carteiraRepository.findAllByUser(userId);

    return lista;
  }

  async update(id: number, updateCarteiraDto: UpdateCarteiraDto) {
    return this.carteiraRepository.update(id, updateCarteiraDto);
  }

  async remove(userId: number) {
    let desativa = new Carteira();
    desativa = { ...desativa, ativo: false };
    return this.carteiraRepository.remove(userId, desativa);
  }
}
