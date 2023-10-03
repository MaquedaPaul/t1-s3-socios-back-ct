import { Column, Entity,ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Persistence } from "./persistence.entity";
import { Partner } from "./partner.entity";

@Entity('phone')
export class Phone extends Persistence {
	@Column('text')
	areaCode: string;

	@Column('text')
	number: string;

	@Column({ type: 'enum', enum: ['FAX', 'OFICINA', 'CELULAR'] })
  	type: string;

	@ManyToOne(() => Partner, (partner) => partner.phones)
	partner: Partner;

	constructor(areaCode: string, number: string, type: string){
			super();
			this.areaCode = areaCode;
			this.number = number;
			this.type = type;
	}
}
