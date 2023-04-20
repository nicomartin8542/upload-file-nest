import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';
import { ValidDataInterface } from '../interfaces/file-valid-data.interface';

export const validFileData = ({ extensionFilters, size }: ValidDataInterface) =>
  new ParseFilePipeBuilder()
    .addFileTypeValidator({
      fileType: new RegExp(extensionFilters),
    })
    .addMaxSizeValidator({
      maxSize: size,
    })
    .build({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    });
