import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { validFileData, storageData } from './helpers';
import { fileFilter } from './helpers/file-name-filter.helpers';

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
  @UseInterceptors(
    FilesInterceptor('file', 2, {
      //cambio nombre de archivo sin gardarlo en en el storage local del servidor
      fileFilter,
    }),
  )
  uploadFiles(
    @UploadedFiles(
      validFileData({ extensionFilters: EXTENSION_IMAGES, size: 25000 }),
    )
    files: Express.Multer.File[],
  ) {
    //return this.filesService.uploadFiles(files);
    return files.map((f) => f.originalname);
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
