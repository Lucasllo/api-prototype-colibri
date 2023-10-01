import { Module } from '@nestjs/common';
import { PessoaService } from '../services/pessoa.service';
import { PessoaController } from '../controllers/pessoa.controller';
import { AuthModule } from './auth.module';
import { PessoaRepository } from '../repositorys/pessoa.repository';

@Module({
  imports: [AuthModule],
  controllers: [PessoaController],
  providers: [PessoaService, PessoaRepository],
  exports: [PessoaService],
})
export class PessoaModule {}
