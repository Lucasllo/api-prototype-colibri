import { Module } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';
import { AuthModule } from '../auth/auth.module';
import { PessoaRepository } from './pessoa.repository';

@Module({
  imports: [AuthModule],
  controllers: [PessoaController],
  providers: [PessoaService, PessoaRepository],
  exports: [PessoaService],
})
export class PessoaModule {}
