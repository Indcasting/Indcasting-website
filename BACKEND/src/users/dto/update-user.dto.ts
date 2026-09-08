import { IsBoolean, IsEmail, IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() @MinLength(8) password?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsIn(['talent', 'seeker']) role?: 'talent' | 'seeker';
  @IsOptional() @IsString() bio?: string;
  @IsOptional() @IsString() skill?: string;
  @IsOptional() @IsString() companyName?: string;
  @IsOptional() @IsString() experience?: string;
  @IsOptional() @IsBoolean() available?: boolean;
}
