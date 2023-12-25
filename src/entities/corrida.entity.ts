import { Endereco } from './endereco.entity';
import { Localizacao } from './localizacao.entity';

export class Corrida {
  data: Date;

  coordenadaInicial: Localizacao;

  coordenadaFinal: Localizacao;

  localInicial: Endereco;

  localFinal: Endereco;

  horaInicial: string;

  horaFinal: string;

  tempoCorrida: string;

  titulo: string;
}
