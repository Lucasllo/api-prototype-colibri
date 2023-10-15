import { Module } from '@nestjs/common';
import { PessoaService } from '../services/pessoa.service';
import { PessoaController } from '../controllers/pessoa.controller';
import { AuthModule } from './auth.module';
import { PessoaRepository } from '../repositorys/pessoa.repository';
import { CarteiraModule } from './carteira.module';

@Module({
  imports: [AuthModule, CarteiraModule],
  controllers: [PessoaController],
  providers: [PessoaService, PessoaRepository],
  exports: [PessoaService],
})
export class PessoaModule {}
