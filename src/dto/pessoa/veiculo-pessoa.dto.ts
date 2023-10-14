import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VeiculoPessoaDto {
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
  @IsString()
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
