import { CreateMensagemDto } from '../dto/mensagem/create-mensagem.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MensagemService } from '../services/mensagem.service';
import { UpdateMensagemDto } from '../dto/mensagem/update-mensagem.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '../guard/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../enum/role.enum';
@ApiBearerAuth('access-token')
@Roles(Role.Admin)
@UseGuards(RoleGuard)
@ApiTags('mensagem')
@Controller('mensagem')
export class MensagemController {
  constructor(private readonly mensagemService: MensagemService) {}

  @Post(':id')
  async create(
    @Body() createMensagemDto: CreateMensagemDto,
    @Param('id') id: string,
  ) {
    return this.mensagemService.create(createMensagemDto, Number(id));
  }

  @Roles(Role.User)
  @Get('user')
  async findAllByUser(@Req() req) {
    return this.mensagemService.findAllByUser(Number(req.user.id));
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