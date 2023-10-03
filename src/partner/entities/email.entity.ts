import { Column, Entity } from "typeorm";
import { Persistence } from "./persistence.entity";

// import { PartnerEntity, Partner } from './partner.entity';

@Entity('emails')    
export class Email extends Persistence{

    @Column({ name: 'email', type: 'varchar' })
    email: string;

    // Se debe crear bien la clase partner
    // @ManyToOne(() => PartnerEntity, (partner) => partner.websites)
    // partner: PartnerEntity;

    constructor(email: string){
        super();
        this.email = email;
    }


}
