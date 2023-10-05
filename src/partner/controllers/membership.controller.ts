import { MembershipService } from '../services/membership.service';
import { Controller, Get, Put, Param, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { Membership } from '../entities/membership.entity';

@Controller('membership')
export class MembershipController {
	constructor(private readonly membershipService: MembershipService) {}

  @Get()
  async getAllCategories(): Promise<Membership[]> {
    const memberships = await this.membershipService.findAllCategories();
    return memberships;
  }

  @Put('/:membershipId/revoke')
  async revokeMembership(@Param('membershipId') membershipId: number): Promise<string> {
    const particularMembership = await this.membershipService.findParticularMembershipById(membershipId);

    if (!particularMembership) 
      throw new NotFoundException('La membresía no fue encontrada.');

    if (!particularMembership.isActive())
      throw new BadRequestException('La membresía ya está revocada o expirada.');

    await this.membershipService.saveParticularMembership(particularMembership);

    return 'La membresía ha sido revocada.';
  }

}
