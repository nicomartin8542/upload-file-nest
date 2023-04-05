import { Module } from '@nestjs/common';
import { ServerFiles } from './cloudfiles/server-files';
import { CloudinaryProvider } from './cloudfiles/clodinary.provider';

@Module({
  providers: [ServerFiles, CloudinaryProvider],
  exports: [ServerFiles, CloudinaryProvider],
})
export class CommonModule {}
