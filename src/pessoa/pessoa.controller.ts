import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';

@Controller('pessoas')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Post()
  async create(@Body() createPessoaDto: CreatePessoaDto) {
    return this.pessoaService.create(createPessoaDto);
  }

  @Get()
  async findAll() {
    return this.pessoaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.pessoaService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePessoaDto: UpdatePessoaDto,
  ) {
    return this.pessoaService.update(id, updatePessoaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.pessoaService.remove(id);
  }
}
