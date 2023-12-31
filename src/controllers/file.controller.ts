import {
  BadRequestException,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileService } from '../services/file.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { User } from '../decorators/user.decorator';
import { Role } from '../enum/role.enum';
import { Roles } from '../decorators/roles.decorator';

@Roles(Role.User, Role.Admin)
@ApiTags('file')
@ApiBearerAuth('access-token')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'foto_perfil',
        maxCount: 1,
      },
      {
        name: 'foto_cnh',
        maxCount: 1,
      },
      {
        name: 'foto_clrv',
        maxCount: 1,
      },
      {
        name: 'foto_antecedentes',
        maxCount: 1,
      },
    ]),
  )
  @Post('fotos')
  async photo(
    @Req() req,
    @UploadedFiles()
    files: {
      foto_perfil: Express.Multer.File;
      foto_cnh: Express.Multer.File;
      foto_clrv: Express.Multer.File;
      foto_antecedentes: Express.Multer.File;
    },
  ) {
    try {
      await this.fileService.photo(req.user, files);
    } catch (error) {
      throw new BadRequestException('Erro com envio.');
    }
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('fotoPerfil')
  async fotoPerfil(@Req() req, @UploadedFile() file: Express.Multer.File) {
    try {
      await this.fileService.fotoPerfil(req.user, file);
    } catch (error) {
      throw new BadRequestException('Erro com envio.');
    }
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('fotoCNH')
  async fotoCNH(@Req() req, @UploadedFile() file: Express.Multer.File) {
    try {
      await this.fileService.fotoCNH(req.user, file);
    } catch (error) {
      throw new BadRequestException('Erro com envio.');
    }
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('fotoCLRV')
  async fotoCLRV(@Req() req, @UploadedFile() file: Express.Multer.File) {
    try {
      await this.fileService.fotoCLRV(req.user, file);
    } catch (error) {
      throw new BadRequestException('Erro com envio.');
    }
  }

  @Roles(Role.Admin)
  @Header('Content-Type', 'image/jpeg')
  @Get('fotoCLRV/:idUser')
  async getFotoCLRV(@Param('idUser') idUser: string) {
    return this.fileService.getFotoCLRV(idUser);
  }

  @Roles(Role.Admin)
  @Header('Content-Type', 'image/jpeg')
  @Get('fotoCNH/:idUser')
  async getFotoCNH(@Param('idUser') idUser: string) {
    return this.fileService.getFotoCNH(idUser);
  }

  @Header('Content-Type', 'image/jpeg')
  @Get('fotoPerfil')
  async getFotoPerfil(@User() user) {
    return await this.fileService.getFotoPerfil(user);
  }
}
