import { Injectable, Logger } from '@nestjs/common';
import { FileRepository } from './file.repository';
import { ConfigService } from '@nestjs/config';
import {
  UPLOAD_FOLDER_CONFIG_NAME,
  UPLOAD_FOLDER_SIGNED_CONFIG_NAME
} from 'src/common/constant';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { FileDocument } from './file.model';
import * as path from 'path';

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly configService: ConfigService
  ) {}

  private async create(
    fileName: string,
    data: Buffer,
    createdBy: string,
    folderUpload: string
  ): Promise<FileDocument> {
    const uploadFolder = this.configService.get(folderUpload);
    Logger.log({ uploadFolder, fileName }, `uploadFolder`);
    const pathOfFolder = path.join(__dirname, uploadFolder);
    if (!existsSync(pathOfFolder)) {
      mkdirSync(pathOfFolder);
    }
    const file = path.join(pathOfFolder, fileName);
    const pathFile = path.join(uploadFolder, fileName);
    Logger.log({ file }, `File info`);
    writeFileSync(file, data);
    return await this.fileRepository.create({
      name: fileName,
      size: data.byteLength,
      path: pathFile,
      createdBy
    });
  }

  async createRawFile(
    fileName: string,
    data: Buffer,
    createdBy: string
  ): Promise<FileDocument> {
    return await this.create(
      fileName,
      data,
      createdBy,
      UPLOAD_FOLDER_CONFIG_NAME
    );
  }

  async createSignedFile(
    fileName: string,
    data: Buffer,
    createdBy: string
  ): Promise<FileDocument> {
    return await this.create(
      fileName,
      data,
      createdBy,
      UPLOAD_FOLDER_SIGNED_CONFIG_NAME
    );
  }

  async getFileById(id: string) {
    const file = await this.fileRepository.getById(id);
    return {
      ...file,
      data: readFileSync(path.join(__dirname, file.path))
    };
  }
}
