import { Injectable } from '@nestjs/common';
import { CreateCarteiraDto } from './dto/create-carteira.dto';
import { UpdateCarteiraDto } from './dto/update-carteira.dto';

@Injectable()
export class CarteiraService {
  create(createCarteiraDto: CreateCarteiraDto) {
    return 'This action adds a new carteira';
  }

  findAll() {
    return `This action returns all carteira`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carteira`;
  }

  update(id: number, updateCarteiraDto: UpdateCarteiraDto) {
    return `This action updates a #${id} carteira`;
  }

  remove(id: number) {
    return `This action removes a #${id} carteira`;
  }
}
