import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from 'src/file/file.module';
import { NotificationModule } from 'src/notification/notification.module';
import { SignuturesController } from './signing.controller';
import { signingSchemaName, SigningSchema } from './signing.model';
import { SigningRepository } from './signing.repository';
import { SigningService } from './signing.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: signingSchemaName, schema: SigningSchema }
    ]),
    FileModule,
    NotificationModule
  ],
  controllers: [SignuturesController],
  providers: [SigningRepository, SigningService]
})
export class SigningModule {}
