import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ClodinaryModule } from 'src/clodinary/clodinary.module';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [ClodinaryModule],
})
export class FilesModule {}
