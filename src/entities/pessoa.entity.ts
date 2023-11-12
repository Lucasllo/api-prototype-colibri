import { UpdateLocalizacaoPessoaDto } from 'src/dto/pessoa/updateLocalizacao-pessoa.dto';
import { Veiculo } from './veiculo.entity';

export class Pessoa {
  id: number;

  nome: string;

  email: string;

  senha: string;

  telefone: string;

  cpf: string;

  termos: boolean;

  veiculo: Veiculo;

  CNH: string;

  CHNImagem: string;

  perfilImagem: string;

  CLRVImagem: string;

  antecedentesImagem: string;

  dataCadastro: Date;

  ativo: boolean;

  online: boolean;

  role: number;

  localizacao: UpdateLocalizacaoPessoaDto;
}
