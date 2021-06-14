export interface SigningDocumentCreation {
  createdBy: string;
  signer: string;
  tagSignatureLocation: string;
}

export interface SigningDocumentCreationDTO extends SigningDocumentCreation {
  fileRawId: string;
  expireTime: Date;
}
