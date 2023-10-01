import { UpdateCarteiraDto } from '../dto/carteira/update-carteira.dto';
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
import { CarteiraService } from '../services/carteira.service';
import { CreateCarteiraDto } from '../dto/carteira/create-carteira.dto';
import { Role } from '../enum/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleGuard } from '../guard/role.guard';
import { User } from 'src/decorators/user.decorator';

@ApiBearerAuth('access-token')
@Roles(Role.Admin)
@UseGuards(RoleGuard)
@ApiTags('carteira')
@Controller('carteira')
export class CarteiraController {
  constructor(private readonly carteiraService: CarteiraService) {}

  @Roles(Role.User)
  @Post()
  async create(@Body() createCarteiraDto: CreateCarteiraDto, @User() user) {
    return this.carteiraService.create(createCarteiraDto, Number(user.id));
  }

  // @Get()
  // async findAll() {
  //   return this.carteiraService.findAll();
  // }

  @Roles(Role.User)
  @Get('user')
  @Get()
  async findAllByUser(@User() user) {
    return this.carteiraService.findAllByUser(Number(user.id));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.carteiraService.findOne(id);
  }

  @Roles(Role.User)
  @Patch()
  async update(@User() user, @Body() updateCarteiraDto: UpdateCarteiraDto) {
    return this.carteiraService.update(Number(user.id), updateCarteiraDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.carteiraService.remove(id);
  }
}
