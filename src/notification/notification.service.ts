import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  constructor(private readonly mailerService: MailerService) {}
  async sendMailToSigner(signingLink: string, signerMail: string) {
    await this.mailerService.sendMail({
      to: signerMail,
      text: signingLink
    });
  }
}
