import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartnerModule } from './partner/partner.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationExceptionFilter } from './validation-exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [PartnerModule, ConfigModule.forRoot(),
    
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'partners',
      username: 'root',
      password: '',      
      autoLoadEntities: true,
      synchronize: true,
    })
  
  
  ],
  controllers: [AppController],
  providers: [ 
    AppService,   
    {provide: APP_FILTER,
    useClass: ValidationExceptionFilter,}
  ],
})
export class AppModule {}
