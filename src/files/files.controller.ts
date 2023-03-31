import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { validFileData } from './helpers/file-valid-data.helpers';
import { storageData } from './helpers/storage.helpers';

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
    @UploadedFile(validFileData)
    file: Express.Multer.File,
  ) {
    return file;
  }

  //Multimples archivos
  @Post('multiple')
  @UseInterceptors(FilesInterceptor('file', 2))
  uploadFiles(@UploadedFiles(validFileData) files: Express.Multer.File[]) {
    return this.filesService.uploadFiles(files);
  }
}
