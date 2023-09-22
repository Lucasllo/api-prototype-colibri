import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreatePessoaDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  telefone: string;

  @IsString()
  cpf: string;

  @IsOptional()
  @IsString()
  veiculo?: string;

  @IsOptional()
  @IsString()
  CNH?: string;

  @IsOptional()
  @IsString()
  perfilImage?: string;

  @IsOptional()
  @IsBoolean()
  online?: boolean;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  @IsString()
  senha: string;
}
