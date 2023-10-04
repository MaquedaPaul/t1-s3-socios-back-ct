import { IsNumber, IsString, MinLength } from "class-validator";

export class PhoneDTO {
	@IsString()
  areaCode: string;

	@IsString()
	@MinLength(6)
  number: string;

	@IsNumber()
  type: number;
}

