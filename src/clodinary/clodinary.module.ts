import { Module } from '@nestjs/common';
import { ClodinaryService } from './clodinary.service';
import { CloudinaryProvider } from './clodinary.provider';

@Module({
  providers: [ClodinaryService, CloudinaryProvider],
  exports: [ClodinaryService, CloudinaryProvider],
})
export class ClodinaryModule {}
