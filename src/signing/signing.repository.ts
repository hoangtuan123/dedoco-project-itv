import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SigningStatus } from './signing.enum';
import { SigningDocumentCreationDTO } from './signing.interface';
import { SigningDocument, signingSchemaName } from './signing.model';

@Injectable()
export class SigningRepository {
  constructor(
    @InjectModel(signingSchemaName) private signingModel: Model<SigningDocument>
  ) {}

  async create(
    signingCreation: SigningDocumentCreationDTO
  ): Promise<SigningDocument> {
    const signingCreated = new this.signingModel(signingCreation);
    return await signingCreated.save();
  }

  async findSigningRequest(id: string): Promise<SigningDocument> {
    return await this.signingModel.findOne({
      _id: id,
      status: SigningStatus.Created
    });
  }

  async updateStatusById(id: string, status: SigningStatus): Promise<void> {
    await this.signingModel.updateOne({ _id: id }, { $set: { status } });
  }
}
