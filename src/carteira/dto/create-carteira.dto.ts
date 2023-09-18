import { IsString } from 'class-validator';

export class CreateCarteiraDto {
  @IsString()
  titular: string;

  @IsString()
  endereco: string;

  @IsString()
  cidade: string;

  @IsString()
  cep: string;

  @IsString()
  nascimento: Date;

  @IsString()
  banco: string;

  @IsString()
  cidadeAgencia: string;

  @IsString()
  numeroAgencia: string;

  @IsString()
  numeroConta: string;

  @IsString()
  tipoConta: string;

  @IsString()
  cpf_cnpj: string;

  @IsString()
  tipoPagamento: string;

  @IsString()
  pix: string;
}
