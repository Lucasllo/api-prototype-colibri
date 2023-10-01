import { Test, TestingModule } from '@nestjs/testing';
import { MensagemController } from '../../controllers/mensagem.controller';
import { MensagemService } from '../../services/mensagem.service';

describe('MensagemController', () => {
  let controller: MensagemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MensagemController],
      providers: [MensagemService],
    }).compile();

    controller = module.get<MensagemController>(MensagemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
