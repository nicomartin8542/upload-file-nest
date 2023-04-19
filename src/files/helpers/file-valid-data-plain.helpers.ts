import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

export const validFileDataPlain = new ParseFilePipeBuilder()
  .addFileTypeValidator({
    fileType: new RegExp(/(plain|txt|csv)/i),
  })
  .addMaxSizeValidator({
    maxSize: 17000,
  })
  .build({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  });
