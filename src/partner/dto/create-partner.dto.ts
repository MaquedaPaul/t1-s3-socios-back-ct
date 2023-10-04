import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { PhoneDTO } from "./phone.dto";
import { CategoryDTO } from "./category.dto";

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

  @IsOptional()
  @IsArray()
  phones: PhoneDTO[];

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
  categories: CategoryDTO[];

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

