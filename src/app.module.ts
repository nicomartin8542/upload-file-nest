import { Module } from '@nestjs/common';
import { FilesModule } from './files/files.module';
import { ClodinaryModule } from './clodinary/clodinary.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [FilesModule, ClodinaryModule, ConfigModule.forRoot()],
})
export class AppModule {}
