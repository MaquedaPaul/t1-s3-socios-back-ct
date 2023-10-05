import { Entity, Column, OneToMany } from 'typeorm';
import { Persistence } from './persistence.entity';
import { ParticularMembership } from './particular-membership.entity';

@Entity('memberships')
export class Membership extends Persistence {

    @Column({ name: 'name', type: 'varchar' })
    name: string;

    @Column({ name: 'month_duration', type: 'integer' })
    monthDuration: number;

    // @OneToMany(() => ParticularMembership, (particularMembership) => particularMembership.membership)
    // particularMemberships: ParticularMembership[];

    constructor(name: string, monthDuration: number) {
        super();
        this.name = name;
        this.monthDuration = monthDuration;
      }
}
