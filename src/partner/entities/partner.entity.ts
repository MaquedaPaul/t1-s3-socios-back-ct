import {   Entity,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
 } from "typeorm";
import { ParticularMembership } from "./particular-membership.entity";
import { Category } from "./category.entity";
import { Persistence } from "./persistence.entity";
import { Phone } from "./phone.entity";
import { PartnerEmail } from "./email.entity";
import { PartnerWebsite } from "./website.entity";

export enum PartnerType {
  TYPE1 = 'PLENARY',
  TYPE2 = 'ASSOCIATE',
}

@Entity('partners')
export class Partner extends Persistence {

  @Column({ type: 'varchar' })
  denomination: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ name: 'image' })
  image: string;

  @OneToOne(() => Location)
  @JoinColumn({ name: 'id_location', referencedColumnName: 'id' })
  location: Location;

  @OneToMany(() => ParticularMembership, (membership) => membership.partner)
  memberships: ParticularMembership[];

  @Column({ type: 'enum', enum: PartnerType })
  partnerType: PartnerType;

  @ManyToMany(() => Category)
  categories: Category[];

  @OneToMany(() => Phone, (phone) => phone.partner)
  phones: Phone[];
    

  @OneToMany(() => PartnerEmail, (email) => email.partner)
  emails: PartnerEmail[];

  @OneToMany(() => PartnerWebsite, (website) => website.partner)
  websites: PartnerWebsite[];


  addMembership(membership: ParticularMembership): void {
    this.memberships.push(membership);
  }

  removeMembership(membership: ParticularMembership): void {
    const index = this.memberships.indexOf(membership);
    if (index !== -1) {
      this.memberships.splice(index, 1);
    }
  }

  addCategory(category: Category): void {
    this.categories.push(category);
  }

  removeCategory(category: Category): void {
    const index = this.categories.indexOf(category);
    if (index !== -1) {
      this.categories.splice(index, 1);
    }
  }

  public addPhone(phone: Phone): void {
    this.phones.push(phone);
  }


  public removePhone(phone: Phone): void {
    const index = this.phones.indexOf(phone);
    if (index !== -1) {
      this.phones.splice(index, 1);
    }
  }

    
  public addEmail(email: PartnerEmail): void {
    this.emails.push(email);
  }

    
  public removeEmail(email: PartnerEmail): void {
    const index = this.emails.indexOf(email);
    if (index !== -1) {
      this.emails.splice(index, 1);
    }
  }

  addWebsite(website: PartnerWebsite): void {
    this.websites.push(website);
  }

  removeWebsite(website: PartnerWebsite): void {
    const index = this.websites.indexOf(website);
    if (index !== -1) {
      this.websites.splice(index, 1);
    }
  }

}
