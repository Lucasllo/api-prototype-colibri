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
import { Pessoa } from 'src/entities/pessoa.entity';
import { ChangePasswordAuthDto } from 'src/dto/auth/change-password-auth.dto';
import { UpdateLocalizacaoPessoaDto } from 'src/dto/pessoa/updateLocalizacao-pessoa.dto';
import { UpdateOnlinePessoaDto } from '../dto/pessoa/updateOnline-pessoa.dto';
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
  async findOne(@User() user: Pessoa) {
    return this.pessoaService.getUser(user);
  }

  @ApiBearerAuth('access-token')
  @Patch()
  async update(@User() user: Pessoa, @Body() updatePessoaDto: UpdatePessoaDto) {
    return this.pessoaService.updateDados(user.id, updatePessoaDto);
  }

  @ApiBearerAuth('access-token')
  @Patch('localizacaoAtual')
  async updateLocalizacao(
    @User() user: Pessoa,
    @Body() updateLocalizacaoPessoaDto: UpdateLocalizacaoPessoaDto,
  ) {
    return this.pessoaService.updateLocalizacao(
      user.id,
      updateLocalizacaoPessoaDto,
    );
  }

  @ApiBearerAuth('access-token')
  @Patch('online')
  async updateOnline(
    @User() user: Pessoa,
    @Body() updateOnlinePessoaDto: UpdateOnlinePessoaDto,
  ) {
    return this.pessoaService.updateOnline(user.id, updateOnlinePessoaDto);
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
  async remove(@User() user: Pessoa) {
    return this.pessoaService.remove(user.id);
  }

  @ApiBearerAuth('access-token')
  @Post('mudaSenha')
  mudaSenha(
    @User() user: Pessoa,
    @Body() changePasswordAuthDto: ChangePasswordAuthDto,
  ) {
    return this.pessoaService.updateSenha(user.id, changePasswordAuthDto);
  }
}
