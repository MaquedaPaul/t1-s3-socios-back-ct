import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreatePartnerDto {
  @IsNotEmpty()
  @IsString()
  denominacion: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  street: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  streetAddress: string;

  @IsOptional()
  @IsString()
  floor: string;

  @IsOptional()
  @IsString()
  apartment: string;

  @IsOptional()
  @IsString()
  department: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  province: string;

//   @IsOptional()
//   @IsArray()
//   phones: PhoneDTO[];

  @IsOptional()
  @IsArray()
  emails: string[];

  @IsOptional()
  @IsArray()
  webSites: string[];

  @IsNotEmpty()
  @IsString()
  partnerType: string;

  @IsOptional()
  @IsArray()
  categories: number[];

  @IsNotEmpty()
  @IsNumber()
  membershipValue: number;

  @IsNotEmpty()
  @IsNumber()
  membershipID: number;

  @IsNotEmpty()
  @IsString()
  startDate: string;
}
