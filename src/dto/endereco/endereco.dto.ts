import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EnderecoDto {
  @ApiProperty({
    example: 'Rua x',
    description: 'Rua do titular da conta',
  })
  @IsString()
  logradouro: string;

  @ApiProperty({
    example: '12',
    description: 'Numero da residencia que titular vive',
  })
  @IsString()
  numero: string;

  @ApiProperty({
    example: 'Centro',
    description: 'Bairro onde titular vive',
  })
  @IsString()
  bairro: string;

  @ApiProperty({
    example: '60743720',
    description: 'Cep do endereço informado',
  })
  @IsString()
  cep: string;

  @ApiProperty({
    example: 'FORTALEZA',
    description: 'cidade onde titular vive',
  })
  @IsString()
  cidade: string;
}
