import { Module } from '@nestjs/common';
import { CorridaService } from '../services/corrida.service';
import { CorridaController } from '../controllers/corrida.controller';
import { CorridaRepository } from '../repositorys/corrida.repository';

@Module({
  controllers: [CorridaController],
  providers: [CorridaService, CorridaRepository],
})
export class CorridaModule {}
