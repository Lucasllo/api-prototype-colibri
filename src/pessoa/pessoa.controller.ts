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
import { PessoaService } from './pessoa.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { RoleGuard } from '../guard/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../enum/role.enum';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
@Roles(Role.Admin)
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

  @Get()
  async findOne(@Req() req) {
    return req.user;
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return this.pessoaService.findOne(Number(id));
  // }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePessoaDto: UpdatePessoaDto,
  ) {
    return this.pessoaService.update(id, updatePessoaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.pessoaService.remove(id);
  }
}
