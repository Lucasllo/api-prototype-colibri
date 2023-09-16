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
  create(@Body() createCarteiraDto: CreateCarteiraDto) {
    return this.carteiraService.create(createCarteiraDto);
  }

  @Get()
  findAll() {
    return this.carteiraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carteiraService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarteiraDto: UpdateCarteiraDto,
  ) {
    return this.carteiraService.update(+id, updateCarteiraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carteiraService.remove(+id);
  }
}
