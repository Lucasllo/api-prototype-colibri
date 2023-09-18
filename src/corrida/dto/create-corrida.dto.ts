import { IsString } from 'class-validator';

export class CreateCorridaDto {
  @IsString()
  data: string;

  @IsString()
  localInicial: string;

  @IsString()
  localFinal: string;

  @IsString()
  horaInicial: string;

  @IsString()
  horaFinal: string;

  @IsString()
  tempoCorrida: string;

  @IsString()
  titulo: string;
}
