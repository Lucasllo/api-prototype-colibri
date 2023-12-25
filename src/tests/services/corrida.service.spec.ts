import { Test, TestingModule } from '@nestjs/testing';
import { CorridaService } from '../../services/corrida.service';
import { CorridaRepository } from '../../repositorys/corrida.repository';
import { QueueService } from '../../services/queue.service';

describe('CorridaService', () => {
  let service: CorridaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorridaService, CorridaRepository, QueueService],
    }).compile();

    service = module.get<CorridaService>(CorridaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
