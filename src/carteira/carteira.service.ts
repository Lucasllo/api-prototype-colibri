import { Injectable } from '@nestjs/common';
import { CreateCarteiraDto } from './dto/create-carteira.dto';
import { UpdateCarteiraDto } from './dto/update-carteira.dto';
import { CarteiraRepository } from './carteira.repository';

@Injectable()
export class CarteiraService {
  constructor(private readonly carteiraRepository: CarteiraRepository) {}

  create(createCarteiraDto: CreateCarteiraDto) {
    return this.carteiraRepository.create(createCarteiraDto);
  }

  findAll() {
    return this.carteiraRepository.getAll();
  }

  findOne(id: string) {
    return this.carteiraRepository.getUser(id);
  }

  update(id: string, updateCarteiraDto: UpdateCarteiraDto) {
    return this.carteiraRepository.update(id, updateCarteiraDto);
  }

  remove(id: string) {
    const desativa = { ativo: false };
    return this.carteiraRepository.remove(id, desativa);
  }
}
