import { Column, Entity, OneToOne } from "typeorm";
import { Persistence } from "./persistence.entity";
// import { PartnerEntity } from "./partner.entity";

@Entity('location')
export class LocationEntity extends Persistence {
    
    @Column('text')
    street: string;

    @Column('text')
    streetAdress: string;

    @Column('text')
    floor: string;

    @Column('text')
    apartment: string;

    @Column('text')
    department: string;

    @Column('text')
    province: string;
    
    constructor(street: string, streetAdress: string, floor: string, apartment: string, department: string, province: string){
        super();
        this.street = street;
        this.streetAdress = streetAdress;
        this.floor = floor;
        this.apartment = apartment;
        this.department = department;
        this.province = province;
    }

   
}
