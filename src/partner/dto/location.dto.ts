import { IsString, MinLength } from "class-validator";

export class LocationDTO {

    @IsString()
    @MinLength(3)
    street: string;

    @IsString()
    @MinLength(2)
    streetAdress: string;

    @IsString()
    floor: string;

    @IsString()
    apartment: string;

    @IsString()
    department: string;

    @IsString()
    @MinLength(3)
    province: string;

}