import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCarteiraDto {
  @ApiProperty({
    example: 'Joao Victor',
    description: 'Nome do titular da conta',
  })
  @IsString()
  titular: string;

  @ApiProperty({
    example: 'Rua x',
    description: 'Rua onde o titular vive',
  })
  @IsString()
  endereco: string;

  @ApiProperty({
    example: 'FORTALEZA',
    description: 'cidade onde titular vive',
  })
  @IsString()
  cidade: string;

  @ApiProperty({
    example: '60743720',
    description: 'Cep do endereço informado',
  })
  @IsString()
  cep: string;

  @ApiProperty({
    example: '01-12-2023',
    description: 'Data de nascimento do titular',
  })
  @IsString()
  nascimento: Date;

  @ApiProperty({
    example: 'Bradesco',
    description: 'Banco da conta informada',
  })
  @IsString()
  banco: string;

  @ApiProperty({
    example: 'Fortaleza',
    description: 'Cidade da agencia bancaria',
  })
  @IsString()
  cidadeAgencia: string;

  @ApiProperty({
    example: '9879-87',
    description: 'numero da agencia',
  })
  @IsString()
  numeroAgencia: string;

  @ApiProperty({
    example: '9845-8',
    description: 'numero da conta bancaria',
  })
  @IsString()
  numeroConta: string;

  @ApiProperty({
    example: 'CORRENTE',
    description: 'tipo de conta bancaria',
  })
  @IsString()
  tipoConta: string;

  @ApiProperty({
    example: '954135649',
    description: 'cpf ou cpnj do titular',
  })
  @IsString()
  cpf_cnpj: string;

  @ApiProperty({
    example: 'PIX',
    description: 'Tipo de pagamente a ser realizado',
  })
  @IsString()
  tipoPagamento: string;

  @ApiProperty({
    example: '99843263194',
    description: 'pix do titular',
  })
  @IsString()
  pix: string;
}
