import { IsNumber, IsString, MinLength } from "class-validator";

export class PhoneDTO {
	@IsString()
  areaCode: string;

	@IsString()
	@MinLength(6)
  number: string;

	@IsNumber()
  type: number;

  constructor(areaCode : string, number : string, type : number){
	this.areaCode = areaCode;
	this.number = number;
	this.type = type;
  }
}

