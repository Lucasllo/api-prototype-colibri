import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { RoleGuard } from '../guard/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../enum/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
@Roles(Role.Admin, Role.User)
@UseGuards(RoleGuard)
@ApiTags('pessoa')
@Controller('pessoa')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Public()
  @Post()
  async create(@Body() createPessoaDto: CreatePessoaDto) {
    this.pessoaService.create(createPessoaDto);
  }

  @ApiBearerAuth('access-token')
  @Get()
  async findOne(@Req() req) {
    return this.pessoaService.getUser(req.user);
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return this.pessoaService.findOne(Number(id));
  // }

  @ApiBearerAuth('access-token')
  @Patch()
  async update(@Req() req, @Body() updatePessoaDto: UpdatePessoaDto) {
    return this.pessoaService.update(Number(req.user.id), updatePessoaDto);
  }

  @ApiBearerAuth('access-token')
  @Patch('veiculo/:idUser')
  async updateVeiculo(
    @Param() idUser,
    @Body() updatePessoaDto: UpdatePessoaDto,
  ) {
    return this.pessoaService.update(Number(idUser), updatePessoaDto);
  }

  @ApiBearerAuth('access-token')
  @Delete()
  async remove(@Req() req) {
    return this.pessoaService.remove(req.user.id);
  }
}
