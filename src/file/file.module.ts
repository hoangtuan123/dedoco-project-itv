import { HttpModule, Module } from '@nestjs/common';
import { FileRepository } from './file.repository';
import { FileService } from './file.service';
import { MongooseModule } from '@nestjs/mongoose';
import { fileSchemaName, FileSchema } from './file.model';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: fileSchemaName, schema: FileSchema }])
  ],
  controllers: [],
  providers: [FileService, FileRepository],
  exports: [FileService]
})
export class FileModule {}
