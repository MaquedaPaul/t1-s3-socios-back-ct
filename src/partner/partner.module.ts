import { Module } from '@nestjs/common';
import { PartnerService } from './services/partner.service';
import { PartnerController } from './controllers/partner.controller';
import { CategoryService } from './services/category.service';
import { MembershipService } from './services/membership.service';
import { CategoryController } from './controllers/category.controller';
import { MembershipController } from './controllers/membership.controller';

@Module({
  controllers: [PartnerController, CategoryController, MembershipController],
  providers: [PartnerService, CategoryService, MembershipService],
})
export class PartnerModule {}
