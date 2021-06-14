import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { fileCreation } from './file.interface';
import { FileDocument, fileSchemaName } from './file.model';

@Injectable()
export class FileRepository {
  constructor(
    @InjectModel(fileSchemaName) private fileModel: Model<FileDocument>
  ) {}

  async create(file: fileCreation): Promise<FileDocument> {
    const createdFile = new this.fileModel(file);
    return await createdFile.save();
  }

  async getById(id: string): Promise<LeanDocument<FileDocument>> {
    return await this.fileModel
      .findById(id)
      .lean()
      .exec();
  }
}
