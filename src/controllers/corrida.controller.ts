import { UpdateCorridaDto } from '../dto/corrida/update-corrida.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { CorridaService } from '../services/corrida.service';
import { CreateCorridaDto } from '../dto/corrida/create-corrida.dto';
import { Role } from '../enum/role.enum';
import { RoleGuard } from '../guard/role.guard';
import { User } from '../decorators/user.decorator';
import { AcceptCorridaDto } from '../dto/corrida/accept-corrida.dto';

@ApiBearerAuth('access-token')
@Roles(Role.Admin)
@UseGuards(RoleGuard)
@ApiTags('corrida')
@Controller('corrida')
export class CorridaController {
  constructor(private readonly corridaService: CorridaService) {}

  @Roles(Role.User)
  @Post()
  async create(@Body() createCorridaDto: CreateCorridaDto, @User() user) {
    return this.corridaService.create(createCorridaDto, Number(user.id));
  }

  @Roles(Role.User)
  @Get('user')
  async findAllByUser(@User() user) {
    return this.corridaService.findAllByUser(Number(user.id));
  }

  @Get()
  async findAll() {
    return this.corridaService.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCorridaDto: UpdateCorridaDto,
  ) {
    return this.corridaService.update(id, updateCorridaDto);
  }

  @Roles(Role.User)
  @Post('buscar')
  async buscarCorrida(@User() user) {
    return this.corridaService.buscarCorrida(user);
  }

  @Roles(Role.User)
  @Post('aceitar')
  async aceitarCorrida(
    @Body() acceptCorridaDto: AcceptCorridaDto,
    @User() user,
  ) {
    return this.corridaService.aceitarCorrida(
      acceptCorridaDto,
      Number(user.id),
    );
  }
}
