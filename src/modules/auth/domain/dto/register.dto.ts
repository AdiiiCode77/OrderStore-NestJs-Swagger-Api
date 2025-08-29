import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsString, MinLength } from 'class-validator';
import { LoginTypesEnum } from '../enums/product.enum';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail() email: string;
  @ApiProperty({minLength:5})
  @IsString() @MinLength(5) username:string
  @ApiProperty({ minLength: 6 })
  @ApiProperty({required: true})@IsIn(LoginTypesEnum) @IsString() type: string;
  @ApiProperty({required: true}) @IsString() @MinLength(6) password: string;
}
