import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MensagemService } from './mensagem.service';
import { CreateMensagemDto } from './dto/create-mensagem.dto';
import { UpdateMensagemDto } from './dto/update-mensagem.dto';

@Controller('mensagem')
export class MensagemController {
  constructor(private readonly mensagemService: MensagemService) {}

  @Post()
  async create(@Body() createMensagemDto: CreateMensagemDto) {
    return this.mensagemService.create(createMensagemDto);
  }

  @Get()
  async findAll() {
    return this.mensagemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.mensagemService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMensagemDto: UpdateMensagemDto,
  ) {
    return this.mensagemService.update(id, updateMensagemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.mensagemService.remove(id);
  }
}
