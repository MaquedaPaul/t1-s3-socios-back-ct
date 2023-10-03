import { Column, Entity, ManyToOne } from "typeorm";
import { Persistence } from "./persistence.entity";
import { Partner } from "./partner.entity";


@Entity('partners-emails')    
export class PartnerEmail extends Persistence{

    @Column({ name: 'email', type: 'varchar' })
    email: string;

    
    @ManyToOne(() => Partner, (partner) => partner.emails)
    partner: Partner;

    constructor(email: string){
        super();
        this.email = email;
    }


}
