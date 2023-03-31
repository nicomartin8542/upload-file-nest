import { Injectable } from '@nestjs/common';
import { ClodinaryService } from 'src/clodinary/clodinary.service';

@Injectable()
export class FilesService {
  constructor(private readonly cloudnarySercice: ClodinaryService) {}

  async uploadFiles(files: Express.Multer.File[]) {
    const promiseUpload = [];

    files.forEach((file) =>
      promiseUpload.push(this.cloudnarySercice.uploadFileCloudinary(file)),
    );

    const result = await Promise.all(promiseUpload);
    return result.map(({ secure_url }) => secure_url);
  }
}
