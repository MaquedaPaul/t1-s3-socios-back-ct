import { Module } from '@nestjs/common';
import { PartnerService } from './services/partner.service';
import { PartnerController } from './controllers/partner.controller';
import { CategoryService } from './services/category.service';
import { MembershipService } from './services/membership.service';
import { CategoryController } from './controllers/category.controller';
import { MembershipController } from './controllers/membership.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailEntity, LocationEntity, WebsiteEntity } from './entities/package.entities';

@Module({
  controllers: [PartnerController, CategoryController, MembershipController],
  providers: [PartnerService, CategoryService, MembershipService],
  imports: [
    TypeOrmModule.forFeature([LocationEntity, EmailEntity, WebsiteEntity]),
  ],
})
export class PartnerModule {}
