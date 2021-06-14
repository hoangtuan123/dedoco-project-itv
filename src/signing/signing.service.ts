import { Injectable, Logger } from '@nestjs/common';
import { MessageCodeError } from 'src/common/message-code-error';
import { FileService } from 'src/file/file.service';
import { NotificationService } from 'src/notification/notification.service';
import { SigningStatus } from './signing.enum';
import { SigningDocumentCreation } from './signing.interface';
import { SigningRepository } from './signing.repository';
import signer from 'node-signpdf';
import path = require('path');
import { ConfigService } from '@nestjs/config';
import { SIGNING_LINK_CONFIG_NAME } from 'src/common/constant';

@Injectable()
export class SigningService {
  constructor(
    private readonly fileService: FileService,
    private readonly notificationService: NotificationService,
    private readonly signingRepository: SigningRepository,
    private readonly configService: ConfigService
  ) {}

  async createFileSigning(
    uploadedFile: Express.Multer.File,
    signingDocumentCreation: SigningDocumentCreation
  ): Promise<void> {
    Logger.log({ signingDocumentCreation }, 'createFileSigning params');
    const { id: fileRawId } = await this.fileService.createRawFile(
      uploadedFile.originalname,
      uploadedFile.buffer,
      signingDocumentCreation.createdBy
    );
    if (!fileRawId) {
      throw new MessageCodeError('file:id:notfound');
    }
    const signingInfo = await this.signingRepository.create({
      ...signingDocumentCreation,
      fileRawId,
      expireTime: new Date(Date.now() + 30 * 60 * 60)
    });
    if (!signingInfo.id) {
      throw new MessageCodeError('signing:id:notfound');
    }
    const signingLink = ` ${this.configService.get(SIGNING_LINK_CONFIG_NAME)}/${
      signingInfo.id
    }`;
    await this.notificationService.sendMailToSigner(
      signingLink,
      signingDocumentCreation.signer
    );
  }

  async signedDocument(
    signningId: string,
    signuture: Express.Multer.File
  ): Promise<{ signedPdf: Buffer; fileName: string }> {
    const signing = await this.signingRepository.findSigningRequest(signningId);
    if (!signing) {
      throw new MessageCodeError('signing:id:notfound');
    }
    const {
      data: fileRawData,
      ...fileRaw
    } = await this.fileService.getFileById(signing.fileRawId);
    const signedPdf = signer.sign(fileRawData, signuture.buffer);

    await Promise.all([
      this.fileService.createSignedFile(
        fileRaw.name,
        signedPdf,
        signing.signer
      ),
      this.signingRepository.updateStatusById(signningId, SigningStatus.Signed)
    ]);
    return { signedPdf, fileName: fileRaw.name };
  }
}
