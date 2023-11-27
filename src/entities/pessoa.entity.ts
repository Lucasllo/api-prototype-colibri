import { Veiculo } from './veiculo.entity';
import { Documentos } from './documentos.entity';
import { Localizacao } from './localizacao.entity';
import { Modalidade } from './modalidade.entity';

export class Pessoa {
  id: number;

  nome: string;

  email: string;

  emailValidado: boolean;

  senha: string;

  telefone: string;

  telefoneValidado: boolean;

  cpf: string;

  termos: boolean;

  veiculo: Veiculo;

  CNH: string;

  documentos: Documentos;

  dataCadastro: Date;

  online: boolean;

  role: number;

  localizacao: Localizacao;

  modalidade: Modalidade;

  tempoOnline: number;

  dataOnline: Date;
}
