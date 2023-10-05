import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
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
import { PhoneDTO } from '../dto/phone.dto';


@Injectable()
export class PartnerService {

  private readonly engine:Liquid

  private categories: Category[];
  
  private membership: Membership[];

  private readonly logger = new Logger('PartnerService');
 
  constructor(

    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,

    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,

    @InjectRepository(Phone)
    private readonly phoneRepository: Repository<Phone>,

    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,
        
    @InjectRepository(ParticularMembership)
    private readonly particularMembershipRepository: Repository<ParticularMembership>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  

  ) {


    this.engine = new Liquid({
      root: ['public/views/', 'public/views/partials/', 'public/views/partials/table/'],
      extname: '.liquid',
    });
  }
  private temporalFunction() {
    //this function should be deleted or replaced by a pregenerated seed or the real database
      const testMembership = new Membership("test", 12);
      const testMembership2 = new Membership("test", 6);
      const testMembership3 = new Membership("test", 24);
      this.membershipRepository.save(testMembership);
      this.membershipRepository.save(testMembership2);
      this.membershipRepository.save(testMembership3);
  }

   async create(partner: CreatePartnerDto): Promise<boolean>{
     try {
      this.temporalFunction();
      const partnerType = this.conversionEnumPartnerType(partner.partnerType);
      const newPartner = this.createBasePartner(partner, partnerType);
      const location = await this.createLocationAndSave(partner); 
      newPartner.location = location;
      newPartner.categories = await this.getCategoriesByIds(partner.categories);
      await this.partnerRepository.save(newPartner);

      this.createPhones(partner.phones, newPartner);
      this.createParticularMembership(partner, newPartner);
      await this.partnerRepository.save(newPartner);
//
      this.createEmails(partner, newPartner);
      this.createWebsites(partner, newPartner);

       await this.partnerRepository.save(newPartner);
       //it is necessary that the partner is saved after modifications (2 modifications in this case)
       //Otherwise it could break the maximum stack
      
      const partners = await this.partnerRepository.find();
      return this.dataPrint(partners,``, "home")  
    } catch (error) {
      this.logger.error(error);
       throw new InternalServerErrorException(error.message);
    }
  // TODO busca categorias -> atrubuto privado, busca membresias -> atrubuto privado, busca socios

  // Estas lineas hacen que se rendericen la vista home con un conjunto de variables.
  //   return await this.engine.renderFile('home', {partners, 
  //     categories,
  //     membership,
  //     message: "" 
  //  });
   }//
  private createWebsites(partner: CreatePartnerDto, newPartner: Partner) {
      newPartner.websites = partner.websites.map(website => new PartnerWebsite(website));
      newPartner.websites.forEach(website => website.partner = newPartner);
  }
  private createEmails(partner: CreatePartnerDto, newPartner: Partner) {
      newPartner.emails = partner.emails.
      map(email => new PartnerEmail(email));
      newPartner.emails.forEach(email => email.partner = newPartner);
  }
  private async createParticularMembership(partner: CreatePartnerDto, newPartner: Partner) {
    const membership = await this.membershipRepository.findOneBy({
        id: partner.membershipID
      }
      );
      const [day, month, year] = partner.startDate.split('-').map(Number);
      const startDate = new Date(year, month - 1, day); // Meses en JavaScript se cuentan desde 0 (enero) hasta 11 (diciembre)
      const particularMembership = this.particularMembershipRepository.create({
        membership: membership,
        startDate: startDate,
        value: partner.membershipValue,
        partner: newPartner,
      });
      newPartner.memberships.push(particularMembership);
  }
  private createPhones(phones: PhoneDTO[], newPartner: Partner) {
        phones.forEach(async (phone) => {
        const aPhoneType = this.conversionEnumPhoneType(phone.type);
        const newPhone =
          this.phoneRepository.create({
          areaCode: phone.areaCode,
          number: phone.number,
            type: aPhoneType,
            partner: newPartner,
          });
        newPartner.phones.push(newPhone);
      });
  }
  private createLocationAndSave(partner: CreatePartnerDto) {
        const location = this.locationRepository.create({
        street: partner.street,
        streetAddress: partner.streetAddress,
        floor: partner.floor,
        apartment: partner.apartment,
        department: partner.department,
        province: partner.province,
        });
    this.locationRepository.save(location);
    return location;
  }
  private createBasePartner(partner: CreatePartnerDto, partnerType: PartnerType) {
        const newPartner = this.partnerRepository.create({
        denomination: partner.denomination,
        name: partner.name,
        image: partner.image,
        partnerType: partnerType,
        phones: [],
        memberships: [],
        websites: []
        });
    return newPartner;
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
    private conversionEnumPartnerType(partnerType: string) {
      if (partnerType === '0') {
          return PartnerType.PLENARY;
      }
      else if (partnerType === '1') {
        return PartnerType.ASSOCIATE;
      } else {
        throw new Error("Tipo de socio no reconocido");
      }

  }
  
    findOne(arg0: number) {
    throw new Error('Method not implemented.');
  }
  

    // TODO busca categorias, busca membresias, busca socios


  async findAll() {
    try {
      const partners = await this.partnerRepository.find({where: {deleteAt: null}});
      this.categories = await this.categoryRepository.find();
      this.membership = await this.membershipRepository.find();
      
      const renderedData = await this.dataPrint(partners, "Socios", "home");
      return renderedData;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
 

  }

  async getCategoriesByIds(idsCategories: CategoryDTO[]): Promise<Category[]> {
    // Utiliza el método 'findByIds' del repositorio para buscar categorías por sus IDs
    return this.categoryRepository.findBy({ id: In(idsCategories) });
  }

  async update(id: number, updatePartnerDto: UpdatePartnerDTO) {

    const partnerUpdate = await this.partnerRepository.preload({
      id: +id,
      updatedAt: new Date(),
      location:updatePartnerDto
    });

    if(!partnerUpdate) 
      throw new NotFoundException(`No existe el socio con id: ${id}`) ;

    try {
        await this.partnerRepository.save(partnerUpdate);
    } catch (error) {
        throw new InternalServerErrorException(error.message) ;
    }
    
    const partners = await this.partnerRepository.find({where: {deleteAt: null}});

    let message : string[] = [];

    message.push(`Se actualizo el socio con id: ${id}`);
    
    return this.dataPrint(partners, `Se actualizo el socio con id: ${id}`, "home")  
  }



  
  async remove(id: number) {
    const deletePartner = await this.partnerRepository.findOneBy({id});
    
    if(!deletePartner) 
      throw new NotFoundException(`No existe el socio con id: ${id}`) ;

    try {
        await this.partnerRepository.preload({
          id: +id,
          deleteAt: new Date(),
          ...deletePartner
        }); 

        await this.partnerRepository.save(deletePartner);

        const partners = await this.partnerRepository.find({where: {deleteAt: null}});

        return this.dataPrint(partners, `Se elimino el socio con id: ${id}`, "home")
    } catch (error) {
        throw new InternalServerErrorException(error.message) ;
    } 

   
  }

  private async dataPrint(partners: Partner[], message: string,view: string){
    return await this.engine.renderFile(view, {partners, 
      categories: this.categories,
      memberships: this.membership,
      message
  }); 
  }

  async deletePartnerById(id: number): Promise<boolean> {
    const partner = await this.partnerRepository.findOne({ where: { id } });

    if (!partner) 
      throw new NotFoundException(`Socio con ID ${id} no encontrado.`);

    partner.deleteAt = new Date();

    await this.partnerRepository.save(partner);

    return true;
  }
}

