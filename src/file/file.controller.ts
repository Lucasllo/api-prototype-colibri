import {
  BadRequestException,
  Controller,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

@ApiTags('file')
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
    },
  ) {
    try {
      console.log(files);
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
}
