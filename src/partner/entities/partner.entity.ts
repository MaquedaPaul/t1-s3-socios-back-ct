import {   Entity,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable
 } from "typeorm";
import { Persistence } from "./persistence.entity";
import { 
    Category, 
    ParticularMembership, 
    PartnerEmail, 
    PartnerWebsite, 
    Phone, 
    Location
} from "./package.entities";


export enum PartnerType {
  PLENARY = 'PLENARY',
  ASSOCIATE = 'ASSOCIATE',
}

@Entity('partners')
export class Partner extends Persistence {

  @Column({ type: 'varchar' })
  denomination: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ name: 'image' })
  image: string;

  @OneToOne(() => Location, {cascade: true, eager: true, nullable: false})
  @JoinColumn({name: 'id_location'})
  location: Location;

  @OneToMany(() => ParticularMembership, (membership) => membership.partner, {cascade: true, eager: true})
  memberships: ParticularMembership[];

  @Column({ type: 'enum', enum: PartnerType })
  partnerType: PartnerType;

  @ManyToMany(() => Category, (category) => category.partners, {cascade: true, eager: true})
  @JoinTable({name: 'partners_categories', joinColumn: {name: 'id_partner'}, inverseJoinColumn: {name: 'id_category'}})
  categories: Category[];

  @OneToMany(() => Phone, (phone) => phone.partner, {cascade: true, eager: true})
  phones: Phone[];
    

  @OneToMany(() => PartnerEmail, (email) => email.partner, {cascade: true, eager: true})
  emails: PartnerEmail[];

  @OneToMany(() => PartnerWebsite, (website) => website.partner, {cascade: true, eager: true})
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
