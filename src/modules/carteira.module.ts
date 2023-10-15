import { Module } from '@nestjs/common';
import { CarteiraService } from '../services/carteira.service';
import { CarteiraController } from '../controllers/carteira.controller';
import { CarteiraRepository } from '../repositorys/carteira.repository';

@Module({
  controllers: [CarteiraController],
  providers: [CarteiraService, CarteiraRepository],
  exports: [CarteiraService],
})
export class CarteiraModule {}
