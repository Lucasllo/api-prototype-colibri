import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CarteiraService } from './carteira.service';
import { CreateCarteiraDto } from './dto/create-carteira.dto';
import { UpdateCarteiraDto } from './dto/update-carteira.dto';

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
