import { Module } from '@nestjs/common';
import { FilesModule } from './files/files.module';
import { ConfigModule } from '@nestjs/config';
import { ServerFiles } from './files/cloudfiles/server-files';

@Module({
  imports: [FilesModule, ConfigModule.forRoot()],
})
export class AppModule {}
