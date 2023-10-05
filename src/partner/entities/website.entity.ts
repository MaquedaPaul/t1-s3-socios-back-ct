import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Persistence } from "./persistence.entity";
import { Partner } from "./partner.entity";
// import { PartnerEntity, Partner } from './partner.entity';

@Entity('partners_websites')    
export class PartnerWebsite extends Persistence{

    @Column('text')
    website: string;

    @ManyToOne(() => Partner, (partner) => partner.websites, {nullable: false})
    @JoinColumn({ name: 'id_partner_website' })
    partner: Partner;

    constructor(email: string){
        super();
        this.website = email;
    }


}
