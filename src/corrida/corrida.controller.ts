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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { CorridaService } from './corrida.service';
import { CreateCorridaDto } from './dto/create-corrida.dto';
import { UpdateCorridaDto } from './dto/update-corrida.dto';
import { Role } from '../enum/role.enum';
import { RoleGuard } from '../guard/role.guard';

@ApiBearerAuth('access-token')
@Roles(Role.Admin)
@UseGuards(RoleGuard)
@ApiTags('corrida')
@Controller('corrida')
export class CorridaController {
  constructor(private readonly corridaService: CorridaService) {}

  @Post()
  async create(@Body() createCorridaDto: CreateCorridaDto) {
    return this.corridaService.create(createCorridaDto);
  }

  @Get()
  async findAll() {
    return this.corridaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.corridaService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCorridaDto: UpdateCorridaDto,
  ) {
    return this.corridaService.update(id, updateCorridaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.corridaService.remove(id);
  }
}
