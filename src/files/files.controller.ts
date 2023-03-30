import {
  Controller,
  Get,
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

  //Un archivo
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
    return file.originalname;
  }

  //Multimples archivos
  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('file', 2, {
      storage: storageData,
    }),
  )
  uploadFiles(@UploadedFiles(validFileData) files: Express.Multer.File[]) {
    return files.map((file) => file.originalname);
  }

  @Get()
  getUrlfile() {
    return 'get url file';
  }
}
