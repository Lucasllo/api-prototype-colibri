import { Module } from '@nestjs/common';
import { CarteiraService } from './carteira.service';
import { CarteiraController } from './carteira.controller';
import { CarteiraRepository } from './carteira.repository';

@Module({
  controllers: [CarteiraController],
  providers: [CarteiraService, CarteiraRepository],
})
export class CarteiraModule {}
