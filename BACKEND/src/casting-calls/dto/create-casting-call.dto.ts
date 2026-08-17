import { IsInt, IsISO8601, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CreateCastingCallDto {
  @IsOptional() @IsString() company?: string;
  @IsString() @MinLength(2) title!: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsString() role?: string;
  @IsOptional() @IsString() gender?: string;
  @IsOptional() @IsString() age?: string;
  @IsOptional() @IsString() height?: string;
  @IsOptional() @IsString() languages?: string;
  @IsOptional() @IsString() experience?: string;
  @IsString() location!: string;
  @IsOptional() @IsISO8601() shootStartDate?: string;
  @IsOptional() @IsISO8601() shootEndDate?: string;
  @IsString() budget!: string;
  @IsOptional() @IsInt() @Min(1) vacancies?: number;
  @IsOptional() @IsISO8601() applicationDeadline?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() type?: string;
}
