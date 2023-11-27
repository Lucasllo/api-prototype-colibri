import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsOptional } from 'class-validator';

export class UpdateModalidadePessoaDto {
  @ApiProperty({
    example: 'True',
    description: 'Tipo de modalidade',
  })
  @IsBoolean()
  @IsOptional()
  mensalidade: boolean;

  @ApiProperty({
    example: '12-02-2023',
    description: 'Data de mudanca de modalidade',
  })
  @IsDate()
  @IsOptional()
  dataMudanca: Date;

  @ApiProperty({
    example: 'True',
    description: 'Tipo de modalidade',
  })
  @IsBoolean()
  @IsOptional()
  escolhaAgendada: boolean;
}
