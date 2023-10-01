import { Test, TestingModule } from '@nestjs/testing';
import { PessoaController } from '../../controllers/pessoa.controller';
import { PessoaService } from '../../services/pessoa.service';

describe('PessoaController', () => {
  let controller: PessoaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PessoaController],
      providers: [PessoaService],
    }).compile();

    controller = module.get<PessoaController>(PessoaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
