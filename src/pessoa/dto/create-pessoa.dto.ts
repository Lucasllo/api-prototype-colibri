import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreatePessoaDto {
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
    example: '123456',
    description:
      'Senha do cliente - Pelo menos 6 digitos, 1 numero, 1 simbolo, 1 letra maiuscula, 1 letra minuscula',
  })
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @IsString()
  senha: string;
}
