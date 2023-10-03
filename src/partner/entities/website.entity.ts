import { Column, Entity } from "typeorm";
import { Persistence } from "./persistence.entity";
// import { PartnerEntity, Partner } from './partner.entity';

@Entity('website')    
export class WebsiteEntity extends Persistence{

    @Column('text')
    website: string;

    // Se debe crear bien la clase partner
    // @ManyToOne(() => PartnerEntity, (partner) => partner.websites)
    // partner: PartnerEntity;

    constructor(email: string){
        super();
        this.website = email;
    }


}
