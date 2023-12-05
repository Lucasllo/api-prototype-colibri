import { Module } from '@nestjs/common';
import { MensagemService } from '../services/mensagem.service';
import { MensagemController } from '../controllers/mensagem.controller';
import { MensagemRepository } from '../repositorys/mensagem.repository';

@Module({
  controllers: [MensagemController],
  providers: [MensagemService, MensagemRepository],
  exports: [MensagemService],
})
export class MensagemModule {}
