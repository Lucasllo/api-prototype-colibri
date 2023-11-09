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
} from '@nestjs/common';
import { MensagemService } from '../services/mensagem.service';
import { UpdateMensagemDto } from '../dto/mensagem/update-mensagem.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '../guard/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../enum/role.enum';
import { User } from 'src/decorators/user.decorator';
@ApiBearerAuth('access-token')
@Roles(Role.Admin, Role.User)
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
  async findAllByUser(@User() user) {
    return this.mensagemService.findAllByUser(Number(user.id));
  }

  @Get()
  async findAll() {
    return this.mensagemService.findAll();
  }

  @Patch(':idUser')
  async update(
    @Param('idUser') id: string,
    @Body() updateMensagemDto: UpdateMensagemDto,
  ) {
    return this.mensagemService.update(Number(id), updateMensagemDto);
  }

  @Delete(':idUser')
  async remove(@Param('idUser') id: string) {
    return this.mensagemService.remove(Number(id));
  }
}
