import { IsArray, ValidateNested } from "class-validator";
import {   Entity,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
 } from "typeorm";

enum PartnerType {
  TYPE1 = 'PLENARY',
  TYPE2 = 'ASSOCIATE',
}

//Code that is commented must be implemented first
@Entity('partners')
export class Partner {


  @Column({ name: 'denomination' })
  private denomination: string;

  @Column({ type: 'varchar' })
  private name: string;

  @Column({ name: 'image' })
  private image: string;

  @OneToOne(() => Location)
  @JoinColumn({ name: 'id_location', referencedColumnName: 'id' })
  private location: Location;
/*
  @ValidateNested({ each: true })
  @IsArray()
  @OneToMany(() => ParticularMembership, (membership) => membership.partner, { cascade: ['refresh'] })
  private memberships: ParticularMembership[];
*/
  @Column({ type: 'enum', enum: PartnerType })
  private partnerType: PartnerType;

/*
  @IsArray()
  @ManyToMany(() => Category)
  private categories: Category[];
*/
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

}
