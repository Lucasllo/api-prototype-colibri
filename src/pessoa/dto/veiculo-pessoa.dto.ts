import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreatePessoaDto {
  @ApiProperty({
    example: 'Honda',
    description: 'Marca do veiculo',
  })
  @IsString()
  marca: string;

  @ApiProperty({
    example: '165ASXS',
    description: 'Placa do veiculo',
  })
  @IsEmail()
  placa: string;

  @ApiProperty({
    example: 'preto',
    description: 'Cor do veiculo',
  })
  @IsString()
  cor: string;

  @ApiProperty({
    example: '12345678999',
    description: 'Renavam do veiculo',
  })
  @IsString()
  renavam: string;
}
