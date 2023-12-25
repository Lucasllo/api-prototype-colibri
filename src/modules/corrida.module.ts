import { Module } from '@nestjs/common';
import { CorridaService } from '../services/corrida.service';
import { CorridaController } from '../controllers/corrida.controller';
import { CorridaRepository } from '../repositorys/corrida.repository';
import { QueueService } from 'src/services/queue.service';

@Module({
  controllers: [CorridaController],
  providers: [CorridaService, CorridaRepository, QueueService],
})
export class CorridaModule {}
