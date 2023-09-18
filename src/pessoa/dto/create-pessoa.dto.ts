import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreatePessoaDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  telefone: string;

  @IsString()
  cpf: string;

  @IsString()
  veiculo: string;

  @IsString()
  CNH: string;

  @IsString()
  perfilImage: string;

  @IsBoolean()
  online: boolean;
}
