import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

export const validFileDataImages = new ParseFilePipeBuilder()
  .addFileTypeValidator({
    fileType: new RegExp(/(plain|txt|csv|pdf|jpeg|png)/i),
  })
  .addMaxSizeValidator({
    maxSize: 17000,
  })
  .build({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  });
