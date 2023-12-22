import { Module } from '@nestjs/common';
import { MailController } from './controller/email.controller';
import { EmailClientService } from './service/email.client.service';
import { ConfigModule } from '@nestjs/config';
import config from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  controllers: [MailController],
  providers: [EmailClientService],
  exports: [EmailClientService],
})
export class MailModule {}
