import { Endereco } from './endereco.entity';

export class Carteira {
  titular: string;

  endereco: Endereco;

  cidade: string;

  cep: string;

  nascimento: Date;

  banco: string;

  cidadeAgencia: string;

  numeroAgencia: string;

  numeroConta: string;

  tipoConta: string;

  cpf_cnpj: string;

  tipoPagamento: string;

  pix: string;
}
