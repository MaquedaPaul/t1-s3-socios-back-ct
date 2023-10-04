import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from '../dto/create-partner.dto';
import { UpdatePartnerDTO } from '../dto/update-partner.dto';
import { Liquid } from 'liquidjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership, Category, Partner } from '../entities/package.entities';


@Injectable()
export class PartnerService {
 

  private readonly engine:Liquid

  private categories: Category[];
  
  private membership: Membership[];

 
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,

    @InjectRepository(Partner)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Partner)
    private readonly membershipRepository: Repository<Membership>
  ) {

    this.engine = new Liquid({
      root: ['public/views/', 'public/views/partials/', 'public/views/partials/table/'],
      extname: '.liquid',
    });

    
  }

  create(createPartnerDto: CreatePartnerDto) {
  // TODO busca categorias -> atrubuto privado, busca membresias -> atrubuto privado, busca socios

  // Estas lineas hacen que se rendericen la vista home con un conjunto de variables.
  //   return await this.engine.renderFile('home', {partners, 
  //     categories,
  //     membership,
  //     message: "" 
  //  });
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

  findOne(id: number) {
    return `This action returns a #${id} partner`;
  }

  async update(id: number, updatePartnerDto: UpdatePartnerDTO) {

    const partnerUpdate = await this.partnerRepository.preload({
      id: +id,
      updatedAt: new Date(),
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

        const partners = await this.partnerRepository.find();

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
  
}
