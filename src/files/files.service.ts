import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { ServerFiles } from './cloudfiles/server-files';
@Injectable()
export class FilesService {
  constructor(private readonly serverFiles: ServerFiles) {}

  async uploadFiles(files: Express.Multer.File[]) {
    const promiseUpload = [];

    files.forEach((file) =>
      promiseUpload.push(
        this.serverFiles.uploadFile<UploadApiErrorResponse | UploadApiResponse>(
          file,
        ),
      ),
    );

    try {
      const result = await Promise.all(promiseUpload);
      return result.map(({ secure_url }) => secure_url);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error al subir los archivos al servidor!');
    }
  }
}
