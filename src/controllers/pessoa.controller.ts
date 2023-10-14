import { UpdatePessoaDto } from './../dto/pessoa/update-pessoa.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Param,
} from '@nestjs/common';
import { PessoaService } from '../services/pessoa.service';
import { CreatePessoaDto } from '../dto/pessoa/create-pessoa.dto';
import { RoleGuard } from '../guard/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../enum/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { User } from 'src/decorators/user.decorator';
import { VeiculoPessoaDto } from 'src/dto/pessoa/veiculo-pessoa.dto';
@Roles(Role.Admin, Role.User)
@UseGuards(RoleGuard)
@ApiTags('pessoa')
@Controller('pessoa')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Public()
  @Post()
  create(@Body() createPessoaDto: CreatePessoaDto) {
    return this.pessoaService.create(createPessoaDto);
  }

  @ApiBearerAuth('access-token')
  @Get()
  async findOne(@User() user) {
    return this.pessoaService.getUser(user);
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return this.pessoaService.findOne(Number(id));
  // }

  @ApiBearerAuth('access-token')
  @Patch()
  async update(@User() user, @Body() updatePessoaDto: UpdatePessoaDto) {
    return this.pessoaService.updateDados(Number(user.id), updatePessoaDto);
  }

  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @Patch('veiculo/:idUser')
  async updateVeiculo(
    @Param('idUser') idUser: string,
    @Body() updateVeiculoPessoaDto: VeiculoPessoaDto,
  ) {
    return this.pessoaService.updateVeiculo(
      Number(idUser),
      updateVeiculoPessoaDto,
    );
  }

  @ApiBearerAuth('access-token')
  @Delete()
  async remove(@User() user) {
    return this.pessoaService.remove(user.id);
  }
}
