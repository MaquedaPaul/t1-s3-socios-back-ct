import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { Persistence } from "./persistence.entity";
import { Partner } from "./partner.entity";

@Entity('categories')
export class Category extends Persistence {
    
    @Column({ name: 'name', type: 'varchar' })
    name: string;

    @Column({ name: 'description', type: 'varchar' })
    description: string;

    
    @ManyToMany(() => Partner, (partner) => partner.categories)
    partners: Partner[];

    constructor(email: string, description: string){
        super();
        this.name = email;
        this.description = description;
    }

}
