import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from '../dto/create-partner.dto';
import { UpdatePartnerDTO } from '../dto/update-partner.dto';
import { Liquid } from 'liquidjs';

import { Membership, Category, Partner, PartnerEmail } from '../entities/package.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { PartnerType } from '../entities/partner.entity';
import { ParticularMembership } from '../entities/particular-membership.entity';
import { Phone, PhoneType } from '../entities/phone.entity';
import { Location } from '../entities/location.entity';
import { In, Repository } from 'typeorm';
import { CategoryDTO } from '../dto/category.dto';
import { PartnerWebsite } from '../entities/website.entity';


@Injectable()
export class PartnerService {

 

  private readonly engine:Liquid

  private categories: Category[];
  
  private membership: Membership[];

 
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,

    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,

    @InjectRepository(Phone)
    private readonly phoneRepository: Repository<Phone>,

    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,
        
    @InjectRepository(Membership)
    private readonly particularMembershipRepository: Repository<ParticularMembership>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  

  ) {


    this.engine = new Liquid({
      root: ['public/views/', 'public/views/partials/', 'public/views/partials/table/'],
      extname: '.liquid',
    });
  }

   async create(partner: CreatePartnerDto): Promise<boolean>{
    try {
      const partnerType =
        partner.partnerType === '0' ? 'PLENARY' : 'ASSOCIATE';

      const newPartner = this.partnerRepository.create({
        denomination: partner.denomination,
        name: partner.name,
        image: partner.image,
        partnerType: partnerType as PartnerType,
      });


      const location = this.locationRepository.create({
        street: partner.street,
        streetAddress: partner.streetAddress,
        floor: partner.floor,
        apartment: partner.apartment,
        department: partner.department,
        province: partner.province,
        
      });
      await this.locationRepository.save(location);
      
      partner.phones.forEach(async (phone) => {

        const aPhoneType = this.conversionEnumPhoneType(phone.type);
        const newPhone =
          this.phoneRepository.create({
          areaCode: phone.areaCode,
          number: phone.number,
            type: aPhoneType,
            partner: newPartner,
          });
        newPhone.partner = newPartner;
        await this.phoneRepository.save(newPhone);
        newPartner.phones.push(newPhone);
      });


      const membership = await this.membershipRepository.findOneBy({
        id: partner.membershipID
      }
      );

      const particularMembership = this.particularMembershipRepository.create({
        membership: membership,
        startDate: new Date(partner.startDate),
        value: partner.membershipValue,
        partner: newPartner,
      });

      await this.membershipRepository.save(particularMembership);
      newPartner.memberships.push(particularMembership);

      newPartner.location = location;
      newPartner.categories = await this.getCategoriesByIds(partner.categories);
      newPartner.emails = partner.emails.
        map(email => new PartnerEmail(email));
      //newPartner.emails.forEach(email => email.partner = newPartner);
      newPartner.websites = partner.websites.map(website => new PartnerWebsite(website));
      //newPartner.websites.forEach(website => website.partner = newPartner);
      await this.partnerRepository.save(newPartner);
      const partners = await this.partnerRepository.find();
      return this.dataPrint(partners,``, "home")  
    } catch (error) {
      throw new Error('Error al crear el socio, por favor inténtelo más tarde');
    }
  // TODO busca categorias -> atrubuto privado, busca membresias -> atrubuto privado, busca socios

  // Estas lineas hacen que se rendericen la vista home con un conjunto de variables.
  //   return await this.engine.renderFile('home', {partners, 
  //     categories,
  //     membership,
  //     message: "" 
  //  });
  }
  private conversionEnumPhoneType(phoneType: number) {

    switch (phoneType) {
      case 0:
        return PhoneType.FAX;
      case 1:
        return PhoneType.OFFICE;
      case 2:
        return PhoneType.MOBILE;
      default:
        throw new Error("Tipo de numero no reconocido");
    }
  }

    findOne(arg0: number) {
    throw new Error('Method not implemented.');
  }
  async findAll() {
    
    this.categories = await this.categoryRepository.find();
    this.membership = await this.membershipRepository.find();

    // TODO busca categorias, busca membresias, busca socios


    // return await this.engine.renderFile('home', {partners, 
    //                                              categories,
    //                                              membership,
    //                                              message: "" 
    //                                           });
  }

  async getCategoriesByIds(idsCategories: CategoryDTO[]): Promise<Category[]> {
    // Utiliza el método 'findByIds' del repositorio para buscar categorías por sus IDs
    return this.categoryRepository.findBy({ id: In(idsCategories) });
  }

  async update(id: number, updatePartnerDto: UpdatePartnerDTO) {

    const partnerUpdate = await this.partnerRepository.preload({
      id: +id,
      ...updatePartnerDto
  
    });

    if(!partnerUpdate) 
      throw new NotFoundException(`No existe el socio con id: ${id}`) ;

    try {
        await this.partnerRepository.save(partnerUpdate);
    } catch (error) {
        throw new InternalServerErrorException(error.message) ;
    }
    
    const partners = await this.partnerRepository.find();

    let message : string[] = [];

    message.push(`Se actualizo el socio con id: ${id}`);
    
    return this.dataPrint(partners, `Se actualizo el socio con id: ${id}`, "home")  
                
  }


  
  remove(id: number) {
    return `This action removes a #${id} partner`;
  }



  private async dataPrint(partners: Partner[], message: string,view: string){
    return await this.engine.renderFile(view, {partners, 
      categories: this.categories,
      memberships: this.membership,
      message
   }); 
  
  }
  
}
