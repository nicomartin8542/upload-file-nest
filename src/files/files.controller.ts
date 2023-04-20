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
import { validFileData, storageData } from './helpers';
import { ValidDataInterface } from './interfaces/file-valid-data.interface';

const EXTENSION_IMAGES: RegExp = /(plain|txt|csv|pdf|jpeg|png)/i;
const EXTENSION_PLAIN: RegExp = /(plain|txt|csv)/i;

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
    @UploadedFile(
      validFileData({ extensionFilters: EXTENSION_IMAGES, size: 17000 }),
    )
    file: Express.Multer.File,
  ) {
    return file;
  }

  //Multimples archivos
  @Post('multiple')
  @UseInterceptors(FilesInterceptor('file', 2))
  uploadFiles(
    @UploadedFiles(
      validFileData({ extensionFilters: EXTENSION_IMAGES, size: 17000 }),
    )
    files: Express.Multer.File[],
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
    @UploadedFile(
      validFileData({ extensionFilters: EXTENSION_PLAIN, size: 17000 }),
    )
    file: Express.Multer.File,
  ) {
    return await this.filesService.procesFilePlain(file);
  }
}
