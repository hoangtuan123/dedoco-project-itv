import {
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { SigningService } from './signing.service';
import { SigningDocumentCreationValidator } from './signing.validator';
import { Readable } from 'stream';

@Controller('signing')
export class SignuturesController {
  constructor(private signingService: SigningService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @HttpCode(201)
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: SigningDocumentCreationValidator
  ): Promise<void> {
    await this.signingService.createFileSigning(file, body);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @HttpCode(200)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  async signDocument(
    @Param('id') id: string,
    @UploadedFile() signutare: Express.Multer.File,
    @Res() res
  ) {
    const { signedPdf, fileName } = await this.signingService.signedDocument(
      id,
      signutare
    );
    res.header('Content-disposition', `attachment; filename=${fileName}`);
    res.send(signedPdf);
  }
}
