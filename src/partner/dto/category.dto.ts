import { IsString } from "class-validator";

export class CategoryDTO {
	@IsString()
  name: string;

	@IsString()
  description: string;
}