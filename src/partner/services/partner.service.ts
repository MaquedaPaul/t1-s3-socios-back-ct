import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePartnerDTO } from '../dto/create-partner.dto';
import { UpdatePartnerDTO } from '../dto/update-partner.dto';
import { Liquid } from 'liquidjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership, Category, Partner } from '../entities/package.entities';
import { PhoneDTO } from '../dto/phone.dto';


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

  create(createPartnerDto: CreatePartnerDTO) {
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

  createSeveralPartners(quantity : number) {
    //Logica del seed (crear varios socios)
    
    for(let i=1;i<=quantity;i++){

      this.create(new CreatePartnerDTO('Denominacion'+i,'Nombre'+i,'Calle'+i,'LinkImagen'+i,'Direccion'+i,'Piso'+i,'Departamento'+i,'Localidad'+i,'Provincia'+i,new PhoneDTO('CodigoArea'+i,'Numero'+i,1),'Correo'+i))
    
    }
    return 'Created the desired amount of test partners.'
  }
  
}
