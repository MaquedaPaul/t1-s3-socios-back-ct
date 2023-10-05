import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { PhoneDTO } from "./phone.dto";
import { CategoryDTO } from "./category.dto";

export class CreatePartnerDto {
  @IsNotEmpty()
  @IsString()
  denomination: string;

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
  websites: string[];

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
  
  constructor(denomination: string, name: string, street: string, image: string, streetAddress: string, floor: string, apartment: string, department: string, province: string, phones: PhoneDTO[], emails: string[], websites: string[], partnerType: string, categories: CategoryDTO[], membershipValue: number, membershipID: number, startDate: string){
    this.denomination = denomination;
    this.name = name;
    this.street = street;
    this.image = image;
    this.streetAddress = streetAddress;
    this.floor = floor;
    this.apartment = apartment;
    this.department = department;
    this.province = province;
    this.phones = phones;
    this.emails = emails;
    this.websites = websites;
    this.partnerType = partnerType;
    this.categories = categories;
    this.membershipValue = membershipValue;
    this.membershipID = membershipID;
    this.startDate = startDate;
  }

  }


