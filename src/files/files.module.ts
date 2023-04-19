import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ServerFiles } from './cloudfiles/server-files';

@Module({
  controllers: [FilesController],
  providers: [FilesService, ServerFiles],
})
export class FilesModule {}
