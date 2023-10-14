import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';
import { EnderecoDto } from '../endereco/endereco.dto';

export class CreateCarteiraDto {
  @ApiProperty({
    example: 'Joao Victor',
    description: 'Nome do titular da conta',
  })
  @IsString()
  titular: string;

  @ApiProperty({
    example:
      '{"logradouro": "Rua x", "numero": "123", "bairro": "Centro", "cep":"60987654", "cidade":"Fortaleza"}',
    description: 'Rua onde o titular vive',
  })
  @IsObject()
  endereco: EnderecoDto;

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
