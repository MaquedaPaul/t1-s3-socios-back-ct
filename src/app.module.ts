import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartnerModule } from './partner/partner.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [PartnerModule, ConfigModule.forRoot(),
    
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'dokku-mariadb-acc-squad-t1s3-db-dev',
      port: 3306,
      database: 'acc_squad_t1s3_db_dev',
      username: 'root',
      password: 'Fr3a951',      
      autoLoadEntities: true,
      synchronize: true,
   // url: 'mysql://root:Fr3a951@dokku-mariadb-acc-squad-t1s3-db-dev:3306/acc_squad_t1s3_db_dev',
  //   synchronize: true,
    
    })
  
 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
