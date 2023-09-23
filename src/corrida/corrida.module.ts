import { Module } from '@nestjs/common';
import { CorridaService } from './corrida.service';
import { CorridaController } from './corrida.controller';
import { CorridaRepository } from './corrida.repository';

@Module({
  controllers: [CorridaController],
  providers: [CorridaService, CorridaRepository],
})
export class CorridaModule {}
