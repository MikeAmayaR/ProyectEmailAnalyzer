import { PartialType, ApiProperty } from '@nestjs/swagger';

export class MailsDto {
  @ApiProperty({ description: `url mails` })
  readonly urlMail: string;
}

export class UpdateUserDto extends PartialType(MailsDto) {}
