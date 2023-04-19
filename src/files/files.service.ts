import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { ServerFiles } from './cloudfiles/server-files';
import { createReadStream, readFile } from 'fs';
import { parse } from 'csv-parse';
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

  async procesFilePlain(file: Express.Multer.File) {
    try {
      if (file.mimetype.split('/')[1] === 'csv') {
        const delimiter = ';';
        const data = await this.readCsv(file, delimiter);
        return data;
      }
      return await this.readTxt(file);
    } catch (error) {
      throw new BadRequestException('proces file txt incorrect!');
    }
  }

  private readTxt(file: Express.Multer.File) {
    return new Promise<string[]>((resolve, reject) => {
      readFile(
        file.path,
        {
          encoding: 'utf-8',
        },
        (error, data) => {
          if (error) reject(error);
          const linea = data.split('\r\n');
          resolve(linea);
        },
      );
    });
  }

  private readCsv(file: Express.Multer.File, delimiter: string) {
    let result: string[] = [];
    return new Promise<string[]>((resolve, reject) => {
      createReadStream(file.path, 'utf8')
        .pipe(parse({ delimiter }))
        .on('data', (row) => {
          result.push({ ...row });
        })
        .on('end', () => {
          resolve(result);
        });
    });
  }
}
