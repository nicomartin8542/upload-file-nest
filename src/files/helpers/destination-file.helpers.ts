import { BadRequestException } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

export const destinationFile = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (err: Error, destination: string) => any,
) => {
  if (!file) return callback(new BadRequestException('File not valid'), null);
  const destination = './static/uploads';
  const path = join(__dirname, `../../../${destination}`);

  if (!existsSync(path))
    return callback(
      new BadRequestException(`Dir ${destination.split('/')[2]} not found`),
      null,
    );

  return callback(null, destination);
};
