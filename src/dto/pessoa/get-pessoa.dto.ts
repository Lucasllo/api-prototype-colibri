import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsObject, IsString } from 'class-validator';
import { VeiculoPessoaDto } from './veiculo-pessoa.dto';

export class GetPessoaDto {
  @ApiProperty({
    example: '1',
    description: 'ID do cliente',
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    example: 'Joao',
    description: 'Nome do cliente',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    example: 'joao@mail.com',
    description: 'Email do cliente',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '85999999999',
    description: 'Telefone do cliente',
  })
  @IsString()
  telefone: string;

  @ApiProperty({
    example: '12345678999',
    description: 'CPF do cliente',
  })
  @IsString()
  cpf: string;

  @ApiProperty({
    example:
      "{cor: 'vermelho', marca: 'yamaha', placa: '98746219', renavam: '98765432199'}",
    description: 'Veiculo do cliente',
  })
  @IsObject()
  veiculo: VeiculoPessoaDto;
}
