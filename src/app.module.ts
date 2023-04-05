import { Module } from '@nestjs/common';
import { FilesModule } from './files/files.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';

@Module({
  imports: [FilesModule, ConfigModule.forRoot(), CommonModule],
  providers: [],
})
export class AppModule {}
