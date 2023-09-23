import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class GetPessoaDto {
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
}
