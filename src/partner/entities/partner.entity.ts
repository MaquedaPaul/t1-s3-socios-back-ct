import { IsArray, ValidateNested } from "class-validator";
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

enum PartnerType {
  TYPE1 = 'PLENARY',
  TYPE2 = 'ASSOCIATE',
}

//Code that is commented must be implemented first
@Entity('partners')
export class Partner {


  @Column({ type: 'varchar' })
  private denomination: string;

  @Column({ type: 'varchar' })
  private name: string;

  @Column({ name: 'image' })
  private image: string;

  @OneToOne(() => Location)
  @JoinColumn({ name: 'id_location', referencedColumnName: 'id' })
  private location: Location;

  @IsArray()
  @OneToMany(() => ParticularMembership, (membership) => membership.partner)
  private memberships: ParticularMembership[];

  @Column({ type: 'enum', enum: PartnerType })
  private partnerType: PartnerType;


  @IsArray()
  @ManyToMany(() => Category)
  private categories: Category[];

    /*
  @IsArray()
  @OneToMany(() => Phone, (phone) => phone.partner, { cascade: ['persist'] })
  private phones: Phone[];
*/
    
/*

  @IsArray()
  @OneToMany(() => PartnerEmail, (email) => email.partner, { cascade: ['insert', 'update'] })
  emails: PartnerEmail[];
*/
    /*
    
    @OneToMany(() => PartnerWebsite, (website) => website.partner, { cascade: ['insert', 'update'] })
    */
  @IsArray()
  private websites: string[];

    public addMembership(membership: ParticularMembership): void {
    this.memberships.push(membership);
  }

  public removeMembership(membership: ParticularMembership): void {
    const index = this.memberships.indexOf(membership);
    if (index !== -1) {
      this.memberships.splice(index, 1);
    }
  }

  public addCategory(category: Category): void {
    this.categories.push(category);
  }

  public removeCategory(category: Category): void {
    const index = this.categories.indexOf(category);
    if (index !== -1) {
      this.categories.splice(index, 1);
    }
  }
/*
  public addPhone(phone: Phone): void {
    this.phones.push(phone);
  }
*/
/*
  public removePhone(phone: Phone): void {
    const index = this.phones.indexOf(phone);
    if (index !== -1) {
      this.phones.splice(index, 1);
    }
  }
*/
    /*
  public addEmail(email: string): void {
    this.emails.push(email);
  }
*/
    /*
  public removeEmail(email: string): void {
    const index = this.emails.indexOf(email);
    if (index !== -1) {
      this.emails.splice(index, 1);
    }
  }
*/
  public addWebsite(website: string): void {
    this.websites.push(website);
  }

  public removeWebsite(website: string): void {
    const index = this.websites.indexOf(website);
    if (index !== -1) {
      this.websites.splice(index, 1);
    }
  }

}
