import {
  IsString,
  IsEmail,
  Matches,
  IsOptional,
  Length,
  IsDate,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UsersDto {
  @IsString()
  @ApiProperty({ description: `user's name` })
  readonly name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: `user's last_name` })
  readonly last_name?: string;

  @IsString()
  @IsOptional()
  @Matches(/^\d{6,10}$/, {
    message:
      'Phone number must contain only digits and be up to 10 characters long.',
  })
  @ApiProperty({ description: `user's phone` })
  readonly phone?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({ description: `user's email` })
  readonly email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: `user's password` })
  readonly password?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: `user's document_type` })
  readonly document_type?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: `user's document_number` })
  readonly document_number?: string;

  @IsOptional()
  @ApiProperty({
    type: String,
    description: `user's license_expiration_date`,
    example: '2023-04-15T00:00:00.000Z',
    required: false,
  })
  @IsDate({ message: 'Invalid date format, please use ISO 8601 format' })
  @Type(() => Date)
  readonly license_expiration_date?: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: `user's photo` })
  readonly photo?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: `user's gender` })
  readonly gender?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: `user's country` })
  readonly country?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: `user's city` })
  readonly city?: string;

  @IsString()
  @IsOptional()
  @Length(1, 5, {
    message: 'The language must be between 1 to 5 characters.',
  })
  @ApiProperty({ description: `user's language` })
  readonly language?: string;
}

export class UpdateUserDto extends PartialType(UsersDto) {}
