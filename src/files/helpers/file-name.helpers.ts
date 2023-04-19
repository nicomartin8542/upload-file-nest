import { BadRequestException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export const fileNameStorage = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (err: Error, fileName: string) => any,
) => {
  let fileName: string;

  if (!file) callback(new BadRequestException('File not valid'), null);

  const extensionFile = file.mimetype.split('/')[1];

  ['plain', 'txt'].includes(extensionFile.toLowerCase())
    ? (fileName = file.originalname)
    : (fileName = `${uuid()}.${extensionFile} `);

  return callback(null, fileName);
};
