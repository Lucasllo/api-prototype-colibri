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
import { ApiTags } from '@nestjs/swagger';
import { CarteiraService } from './carteira.service';
import { CreateCarteiraDto } from './dto/create-carteira.dto';
import { UpdateCarteiraDto } from './dto/update-carteira.dto';
import { Role } from '../enum/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleGuard } from '../guard/role.guard';

@Roles(Role.Admin)
@UseGuards(RoleGuard)
@ApiTags('carteira')
@Controller('carteira')
export class CarteiraController {
  constructor(private readonly carteiraService: CarteiraService) {}

  @Post()
  async create(@Body() createCarteiraDto: CreateCarteiraDto) {
    return this.carteiraService.create(createCarteiraDto);
  }

  @Get()
  async findAll() {
    return this.carteiraService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.carteiraService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCarteiraDto: UpdateCarteiraDto,
  ) {
    return this.carteiraService.update(id, updateCarteiraDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.carteiraService.remove(id);
  }
}
