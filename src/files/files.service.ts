import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { ServerFiles } from './cloudfiles/server-files';
import { createReadStream, readFile } from 'fs';
import { parse } from 'csv-parse';
import { KeysPrueba } from './interfaces/keys-prueba.interface';
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
      const KEYSCSV = [
        'campo 1',
        'campo 2',
        'campo 3',
        'campo 4',
        'campo 5',
        'campo 6',
        'campo 7',
        'campo 8',
      ];

      //Verifico si es csv
      if (file.mimetype.split('/')[1] === 'csv') {
        const delimiter = ',';
        const data = await this.readCsv<string[]>(file, ';', KEYSCSV);
        return data;
      }

      return await this.readTxt<string[]>(file);
    } catch (error) {
      console.log(error);

      throw new BadRequestException({
        error: 'Bad request',
        message: 'proces file txt incorrect!',
        cause: error.code,
      });
    }
  }

  private readTxt<T>(file: Express.Multer.File) {
    return new Promise<T>((resolve, reject) => {
      readFile(
        file.path,
        {
          encoding: 'utf-8',
        },
        (error, data) => {
          if (error) reject(error);
          const linea: T | any = data.split('\r\n');
          resolve(linea);
        },
      );
    });
  }

  private readCsv<T>(
    file: Express.Multer.File,
    delimiter: string = ';',
    keys?: string[],
  ) {
    let result: T[] = [];

    return new Promise<T>((resolve, reject) => {
      createReadStream(file.path, 'utf8')
        .pipe(parse({ delimiter }))
        .on('data', (row) => {
          result?.push({ ...row });
        })
        .on('error', (err) => reject(err))
        .on('end', () => {
          //Verifico si envio keys, sino imprimo con numeros
          const output: T[] | any =
            keys?.length === 0 || !keys
              ? result
              : result.map((row) => {
                  let obj = {};
                  keys.forEach((key, i) =>
                    Object.assign(obj, { [key]: row[i] }),
                  );
                  return obj;
                });
          resolve(output);
        });
    });
  }
}
