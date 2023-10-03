import { BaseEntity, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export abstract class Persistence extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at'})
    deleteAt: Date;

    constructor(){
        super();
        this.createdAt = new Date();
    }
    
    // Otras columnas comunes que desees agregar a tus entidades
  }
