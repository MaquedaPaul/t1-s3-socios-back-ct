import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Persistence } from "./persistence.entity";
import { MembershipEntity } from "./membership.entity";
import { Partner } from "./partner.entity";


@Entity('particular_memberships')
export class ParticularMembershipEntity extends Persistence{

    @ManyToOne(() => MembershipEntity, { eager: true })
    @JoinColumn({ name: 'id_membership' })
    membership: MembershipEntity;

    @Column({ name: 'start_date', type: 'date' })
    startDate: Date;

    @Column({ name: 'value', type: 'double' })
    value: number;

    @ManyToOne(() => Partner, { eager: true })
    @JoinColumn({ name: 'id_partner' })
    partner: Partner;


    isActive(): boolean {
        const currentDate = new Date();
        return currentDate > this.startDate && currentDate < this.getEndDate();
      }

    getEndDate(): Date {
        const endDate = new Date(this.startDate);
        endDate.setMonth(endDate.getMonth() + this.membership.monthDuration);
        return endDate;
    }


    constructor(membership: MembershipEntity, startDate: Date, value: number) {
        super();
        this.membership = membership;
        this.startDate = startDate;
        this.value = value;
        
    }
}
