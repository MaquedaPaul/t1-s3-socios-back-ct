import { IsString } from "class-validator";

export class UpdatePartnerDTO {
    @IsString()
    denomination: string;

    @IsString()
    name: string;

    @IsString()
    street: string;

    @IsString()
    streetAddress: string;
    
    @IsString()
    floor: string;
    
    @IsString()
    apartment: string;
    
    @IsString()
    department: string;
    
    @IsString()
    province: string;
}
