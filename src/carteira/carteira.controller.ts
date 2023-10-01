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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CarteiraService } from './carteira.service';
import { CreateCarteiraDto } from './dto/create-carteira.dto';
import { UpdateCarteiraDto } from './dto/update-carteira.dto';
import { Role } from '../enum/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleGuard } from '../guard/role.guard';

@ApiBearerAuth('access-token')
@Roles(Role.Admin)
@UseGuards(RoleGuard)
@ApiTags('carteira')
@Controller('carteira')
export class CarteiraController {
  constructor(private readonly carteiraService: CarteiraService) {}

  @Roles(Role.User)
  @Post()
  async create(@Body() createCarteiraDto: CreateCarteiraDto, @Req() req) {
    return this.carteiraService.create(createCarteiraDto, Number(req.user.id));
  }

  // @Get()
  // async findAll() {
  //   return this.carteiraService.findAll();
  // }

  @Roles(Role.User)
  @Get('user')
  @Get()
  async findAllByUser(@Req() req) {
    return this.carteiraService.findAllByUser(Number(req.user.id));
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
