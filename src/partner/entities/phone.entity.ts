import { Column, Entity,ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Persistence } from "./persistence.entity";
import { Partner } from "./partner.entity";

export enum PhoneType {
  FAX = 'FAX',
  OFFICE = 'OFICINA',
  MOBILE = 'CELULAR'
}

@Entity('phones')
export class Phone extends Persistence {
	@Column('text')
	areaCode: string;

	@Column('text')
	number: string;

	@Column({ type: 'enum', enum: PhoneType })
  	type: PhoneType;

	@ManyToOne(() => Partner, (partner) => partner.phones, {nullable: false})
	@JoinColumn({ name: 'id_partner_phone' })
	partner: Partner;

	constructor(areaCode: string, number: string, type: PhoneType){
			super();
			this.areaCode = areaCode;
			this.number = number;
			this.type = type;
	}
}
