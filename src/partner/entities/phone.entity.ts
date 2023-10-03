import { Column, Entity,ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Persistence } from "./persistence.entity";

@Entity('phone')
export class PhoneEntity extends Persistence {
	@PrimaryGeneratedColumn()
  id: number;

	@Column('text')
	areaCode: string;

	@Column('text')
	number: string;

	@Column({ type: 'enum', enum: ['HOME', 'WORK', 'MOBILE'] })
  type: string;
	
	
	constructor(areaCode: string, number: string, type: string){
			super();
			this.areaCode = areaCode;
			this.number = number;
			this.type = type;
	}
}