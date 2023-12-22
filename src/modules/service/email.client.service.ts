import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { simpleParser } from 'mailparser';
import { MailsDto } from '../dto/mail.dto';

@Injectable()
export class EmailClientService {
  async extractJsonFromEmail(emailBuffer: Buffer): Promise<any> {
    try {
      const parsedEmail = await simpleParser(emailBuffer);

      for (const attachment of parsedEmail.attachments) {
        if (attachment.contentType === 'application/json') {
          const jsonContent = attachment.content.toString('utf8');
          return JSON.parse(jsonContent);
        }
      }
      throw new Error('No JSON file found in email attachments');
    } catch (error) {
      throw new Error(`Error processing email: ${error.message}`);
    }
  }

  async extractJsonFromEmailToUrl(urlMail: string): Promise<MailsDto> {
    try {
      const emailBuffer = await readFile(urlMail);
      const parsedEmail = await simpleParser(emailBuffer);

      for (const attachment of parsedEmail.attachments) {
        if (attachment.contentType === 'application/json') {
          const jsonContent = attachment.content.toString('utf8');
          return JSON.parse(jsonContent);
        }
      }
      throw new Error('No JSON file found in email attachments');
    } catch (error) {
      throw new Error(`Error processing email file: ${error.message}`);
    }
  }
}
