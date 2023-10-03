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
      host: 'localhost',
      port: 3306,
      database: 'partners_module',
      username: 'root',
      password: '',      
      autoLoadEntities: true,
      synchronize: true,
    })
  
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
