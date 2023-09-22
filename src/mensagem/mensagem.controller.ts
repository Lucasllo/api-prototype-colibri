import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MensagemService } from './mensagem.service';
import { CreateMensagemDto } from './dto/create-mensagem.dto';
import { UpdateMensagemDto } from './dto/update-mensagem.dto';
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '../guard/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../enum/role.enum';
@Roles(Role.Admin)
@UseGuards(RoleGuard)
@ApiTags('mensagem')
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
