import { Column, Entity, ManyToOne } from "typeorm";
import { Persistence } from "./persistence.entity";
import { Partner } from "./partner.entity";
// import { PartnerEntity, Partner } from './partner.entity';

@Entity('partners-websites')    
export class PartnerWebsite extends Persistence{

    @Column('text')
    website: string;

    @ManyToOne(() => Partner, (partner) => partner.websites)
    partner: Partner;

    constructor(email: string){
        super();
        this.website = email;
    }


}
