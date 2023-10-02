import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartnerModule } from './partner/partner.module';

@Module({
  imports: [PartnerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
