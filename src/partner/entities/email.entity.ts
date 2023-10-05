import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Persistence } from "./persistence.entity";
import { Partner } from "./partner.entity";


@Entity('partners_emails')    
export class PartnerEmail extends Persistence{

    @Column({ name: 'email', type: 'varchar' })
    email: string;

    
    @ManyToOne(() => Partner, (partner) => partner.emails, {nullable: false})
    @JoinColumn({ name: 'id_partner_email' })
    partner: Partner;

    constructor(email: string){
        super();
        this.email = email;
    }


}
