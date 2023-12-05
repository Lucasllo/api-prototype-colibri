import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VeiculoTipoPessoaDto {
  @ApiProperty({
    example: 'Moto',
    description: 'Tipo de veiculo - (Moto ou Carro)',
  })
  @IsString()
  tipo: string;
}
