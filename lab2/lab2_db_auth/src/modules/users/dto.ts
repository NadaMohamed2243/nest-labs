// users/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  Matches,
  IsEnum,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

export class BaseUserDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'nada@gmail.com',
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: '12345678',
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @MinLength(8)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'Password must be alphanumeric' })
  password: string;
}


export class SignInDto extends BaseUserDto {
}


export class SignUpDto extends BaseUserDto {
  @ApiProperty({
    description: 'The full name of the user',
    example: 'nada mohamed ahmed',
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  fullName: string;

  @ApiProperty({
    description: 'The age of the user',
    example: 20,
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNumber()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Min(16)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Max(60)
  age: number;

  @ApiProperty({
    description: 'The mobile number of the user',
    example: '01012345678',
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Matches(/^01\d{9}$/, { message: 'Invalid Egyptian mobile number' })
  mobileNumber: string;

  @ApiProperty({
    description: 'The role of the user',
    example: 'admin',
    enum: ['admin', 'normal'],
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEnum(['admin', 'normal'])
  role: 'admin' | 'normal';
}