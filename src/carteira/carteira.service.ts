import { Injectable } from '@nestjs/common';
import { CreateCarteiraDto } from './dto/create-carteira.dto';
import { UpdateCarteiraDto } from './dto/update-carteira.dto';
import { CarteiraRepository } from './carteira.repository';

@Injectable()
export class CarteiraService {
  repository = new CarteiraRepository();

  create(createCarteiraDto: CreateCarteiraDto) {
    return this.repository.create(createCarteiraDto);
  }

  findAll() {
    return this.repository.getAll();
  }

  findOne(id: string) {
    return this.repository.getUser(id);
  }

  update(id: string, updateCarteiraDto: UpdateCarteiraDto) {
    return this.repository.update(id, updateCarteiraDto);
  }

  remove(id: string) {
    const desativa = { ativo: false };
    return this.repository.remove(id, desativa);
  }
}
