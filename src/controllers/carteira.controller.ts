import { UpdateCarteiraDto } from '../dto/carteira/update-carteira.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
import { Pessoa } from 'src/entities/pessoa.entity';

@ApiBearerAuth('access-token')
@Roles(Role.Admin)
@UseGuards(RoleGuard)
@ApiTags('carteira')
@Controller('carteira')
export class CarteiraController {
  constructor(private readonly carteiraService: CarteiraService) {}

  @Roles(Role.User)
  @Post()
  async create(
    @Body() createCarteiraDto: CreateCarteiraDto,
    @User() user: Pessoa,
  ) {
    return this.carteiraService.create(createCarteiraDto, user.id);
  }

  @Roles(Role.User)
  @Get('user')
  @Get()
  async findAllByUser(@User() user: Pessoa) {
    return this.carteiraService.findAllByUser(user.id);
  }

  @Roles(Role.User)
  @Patch()
  async update(
    @User() user: Pessoa,
    @Body() updateCarteiraDto: UpdateCarteiraDto,
  ) {
    return this.carteiraService.update(user.id, updateCarteiraDto);
  }

  @Roles(Role.User)
  @Delete()
  async remove(@User() user: Pessoa) {
    return this.carteiraService.remove(Number(user.id));
  }
}
