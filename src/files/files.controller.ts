import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Headers,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { validFileDataImages } from './helpers/file-valid-data-images.helpers';
import { storageData } from './helpers/storage.helpers';
import { IncomingHttpHeaders } from 'http';
import { validFileDataPlain } from './helpers/file-valid-data-plain.helpers';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  //Un archivo -> Ejemplo para cargar los archivos en el storage interno
  @Post('one')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storageData,
    }),
  )
  uploadFile(
    @UploadedFile(validFileDataImages)
    file: Express.Multer.File,
  ) {
    return file;
  }

  //Multimples archivos
  @Post('multiple')
  @UseInterceptors(FilesInterceptor('file', 2))
  uploadFiles(
    @UploadedFiles(validFileDataImages) files: Express.Multer.File[],
  ) {
    return this.filesService.uploadFiles(files);
  }

  @Post('plain')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storageData,
    }),
  )
  async uploadFilePlain(
    @UploadedFile(validFileDataPlain) file: Express.Multer.File,
  ) {
    return await this.filesService.procesFilePlain(file);
  }
}
