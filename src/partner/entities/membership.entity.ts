import { Entity, Column } from 'typeorm';
import { Persistence } from './persistence.entity';

@Entity('memberships')
export class Membership extends Persistence {

    @Column({ name: 'name', type: 'varchar' })
    name: string;

    @Column({ name: 'month_duration', type: 'integer' })
    monthDuration: number;

    constructor(name: string, monthDuration: number) {
        super();
        this.name = name;
        this.monthDuration = monthDuration;
      }
}
