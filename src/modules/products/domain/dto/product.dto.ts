import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { ProductTypesEnum } from '../enums/product.enum';

export class CreateProductDto {
  @ApiProperty() @IsString() @MaxLength(120) Productname: string;
  @ApiProperty({ required: true }) @IsOptional() @IsString() @MaxLength(1000) Description?: string;
  @ApiProperty({required:true}) @IsString() @IsIn(ProductTypesEnum)  type?: string;
  @ApiProperty() @IsString() Price : string;
}
