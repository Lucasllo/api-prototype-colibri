import { Test, TestingModule } from '@nestjs/testing';
import { CorridaController } from '../../controllers/corrida.controller';
import { CorridaService } from '../../services/corrida.service';
import { CorridaRepository } from '../../repositorys/corrida.repository';
import { QueueService } from '../../services/queue.service';
import { initializeFirebase } from '../../firebase.config';
import * as dotenv from 'dotenv';

describe('CorridaController', () => {
  let controller: CorridaController;

  beforeEach(async () => {
    dotenv.config();
    initializeFirebase();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CorridaController],
      providers: [CorridaService, CorridaRepository, QueueService],
    }).compile();

    controller = module.get<CorridaController>(CorridaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
