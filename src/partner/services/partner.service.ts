import { Injectable } from '@nestjs/common';
import { CreatePartnerDto } from '../dto/create-partner.dto';
import { UpdatePartnerDto } from '../dto/update-partner.dto';
import { Liquid } from 'liquidjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from '../entities/partner.entity';
import { PartnerType } from '../entities/partner.entity';
import { ParticularMembership } from '../entities/particular-membership.entity';
import { Membership } from '../entities/membership.entity';
import { Phone } from '../entities/phone.entity';
import { Location } from '../entities/location.entity';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';


@Injectable()
export class PartnerService {

  private readonly engine:Liquid

  // private categories: Category[];
  
  // private membership: Membership[];

 
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

   async createPartner(partner: CreatePartnerDto): Promise<boolean>{
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
         //No se por qué no funciona
      });
      await this.locationRepository.save(location);
/*
      partner.phones.forEach(async (phone) => {
        const newPhone = this.phoneRepository.create({
          areaCode: phone.areaCode,
          number: phone.number,
          type: phone.type,
        });
        await this.phoneRepository.save(newPhone);
        newPartner.phones.push(newPhone);
      });
*/

      const membership = await this.membershipRepository.findOneBy({ id: partner.membershipID}
      );

      const particularMembership = this.particularMembershipRepository.create({
        startDate: new Date(partner.startDate),
        value: partner.membershipValue,
      });
      await this.membershipRepository.save(particularMembership);
      newPartner.memberships.push(particularMembership);

      newPartner.location = location;
      newPartner.categories = await this.getCategoriesByIds(partner.categories);
      // newPartner.emails = partner.emails;
      // newPartner.webSites = partner.webSites;

      await this.partnerRepository.save(newPartner);
      return true;
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

  async findAll() {

    // TODO busca categorias, busca membresias, busca socios


    // return await this.engine.renderFile('home', {partners, 
    //                                              categories,
    //                                              membership,
    //                                              message: "" 
    //                                           });
  }

  async findMembershipById(id: number) {
    const membership = await this.membershipRepository.findOneBy({id});
    return membership;
  }
  async getCategoriesByIds(idsCategories: number[]): Promise<Category[]> {
    // Utiliza el método 'findByIds' del repositorio para buscar categorías por sus IDs
    return this.categoryRepository.findByIds(idsCategories);
  }


  update(id: number, updatePartnerDto: UpdatePartnerDto) {
    return `This action updates a #${id} partner`;
  }

  remove(id: number) {
    return `This action removes a #${id} partner`;
  }
}
