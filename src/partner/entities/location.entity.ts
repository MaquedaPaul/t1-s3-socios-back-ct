import { Column, Entity, OneToOne } from "typeorm";
import { Persistence } from "./persistence.entity";
// import { PartnerEntity } from "./partner.entity";

@Entity('locations')
export class Location extends Persistence {
    
    @Column('varchar')
    street: string;

    @Column('varchar')
    streetAddress: string;

    @Column('varchar')
    floor: string;

    @Column('varchar')
    apartment: string;

    @Column('varchar')
    department: string;

    @Column('varchar')
    province: string;
    
    constructor(street: string, streetAdress: string, floor: string, apartment: string, department: string, province: string){
        super();
        this.street = street;
        this.streetAddress = streetAdress;
        this.floor = floor;
        this.apartment = apartment;
        this.department = department;
        this.province = province;
    }

   
}
