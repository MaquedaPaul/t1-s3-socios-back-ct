import { IsString } from "class-validator";

export class CategoryDTO {
	@IsString()
  name: string;

	@IsString()
  description: string;

  constructor(name : string, description : string){
    this.name = name;
    this.description = description;
  }
}