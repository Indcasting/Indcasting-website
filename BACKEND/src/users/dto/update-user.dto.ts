import { PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateUserDto extends PartialType(
  OmitType<User, 'password' | 'createdAt'>()
) {}

import { IsString, IsOptional, IsEmail, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsString()
  city: string;

  @IsString()
  role: 'talent' | 'seeker';
}