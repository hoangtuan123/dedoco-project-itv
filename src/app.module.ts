import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { SigningModule } from './signing/signing.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URL),
    SigningModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_SMTP_HOST,
        port: Number(process.env.MAIL_SMTP_PORT),
        secure: process.env.MAIL_SMTP_SECURE === 'true' ? true : false,
        auth: {
          user: process.env.MAIL_SMTP_USER,
          pass: process.env.MAIL_SMTP_PASSWORD
        }
      },
      defaults: {
        from: process.env.MAIL_SMTP_FROM
      }
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
