import { Module } from '@nestjs/common';
import { MensagemService } from './mensagem.service';
import { MensagemController } from './mensagem.controller';
import { MensagemRepository } from './mensagem.repository';

@Module({
  controllers: [MensagemController],
  providers: [MensagemService, MensagemRepository],
})
export class MensagemModule {}
