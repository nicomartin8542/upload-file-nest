import { Injectable } from '@nestjs/common';
import { FileAdapter } from '../interfaces/upload-file.interface';
import { v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class ServerFiles implements FileAdapter {
  uploadFile<T>(file: Express.Multer.File): Promise<T> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error: T, result: T) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }
}
