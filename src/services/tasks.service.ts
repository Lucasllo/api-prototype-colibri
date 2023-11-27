import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PessoaService } from './pessoa.service';
import { Pessoa } from 'src/entities/pessoa.entity';

@Injectable()
export class TasksService {
  constructor(private readonly pessoaService: PessoaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async atualizaMensalidade() {
    const lista: Pessoa[] = await this.pessoaService.findAll();
    lista.forEach((p) => {
      const data = new Date((p.modalidade.dataMudanca as any).seconds * 1000);
      if (
        data.getDate() == new Date().getDate() &&
        data.getMonth() == new Date().getMonth() &&
        data.getFullYear() == new Date().getFullYear()
      ) {
        const novadata = new Date(data);
        novadata.setMonth(data.getMonth() + 1);
        p.modalidade.mensalidade = p.modalidade.escolhaAgendada;
        p.modalidade.dataMudanca = novadata;
      }

      this.pessoaService.updateModalidade(p.id, p.modalidade);
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async atualizaTempoOnline() {
    const lista: Pessoa[] = await this.pessoaService.findAll();
    lista.forEach((p) => {
      const update = {
        tempoOnline: 0,
      };

      this.pessoaService.updateDadosTempoUso(p.id, update);
    });
  }
}
