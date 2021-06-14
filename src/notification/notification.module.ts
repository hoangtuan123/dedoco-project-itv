import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Module({
  imports: [],
  controllers: [],
  providers: [NotificationService],
  exports: [NotificationService]
})
export class NotificationModule {}
