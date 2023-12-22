import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { EmailClientService } from '../service/email.client.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MailsDto } from '../dto/mail.dto';

@ApiTags('mail-url-client')
@Controller('mail-url-client')
export class MailController {
  constructor(private emailClientService: EmailClientService) {}

  @ApiOperation({ summary: 'Mail analyzer by file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a .eml file',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The content of the JSON file found in the email attachment',
  })
  @Post('/analyzer')
  @UseInterceptors(FileInterceptor('file'))
  async analyzeMail(@UploadedFile() file): Promise<any> {
    if (!file) throw new BadRequestException('No file provided');
    if (file.mimetype !== 'message/rfc822')
      throw new BadRequestException('Invalid file type');

    return await this.emailClientService.extractJsonFromEmail(file.buffer);
  }

  @ApiOperation({ summary: 'Mail analyzer by route' })
  @ApiConsumes('multipart/raw')
  @ApiBody({
    description: 'Upload a .eml file',
    type: MailsDto,
  })
  @Post('/analyzer-by-path')
  async analyzeMailByPath(@Body('urlMail') urlMail: string): Promise<MailsDto> {
    if (!urlMail) throw new BadRequestException('No file path provided');
    return await this.emailClientService.extractJsonFromEmailToUrl(urlMail);
  }
}
