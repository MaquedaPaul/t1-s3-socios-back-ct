import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from '../dto/create-partner.dto';
import { UpdatePartnerDto } from '../dto/update-partner.dto';
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

  async update(id: number, updatePartnerDto: UpdatePartnerDto) {

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
