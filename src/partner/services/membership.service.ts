import { Injectable, NotFoundException } from '@nestjs/common';
import { Membership } from '../entities/membership.entity';
import { ParticularMembership } from '../entities/particular-membership.entity';

@Injectable()
export class MembershipService {
  private memberships: Membership[] = [];

  findAllCategories(): Membership[] {
    return this.memberships;
  }

  findParticularMembershipById(id: number): ParticularMembership | undefined {
    const membership = this.memberships.find((m) => m.id === id);
    if (!membership) 
      throw new NotFoundException('La membresía no fue encontrada.');
    return membership as unknown as ParticularMembership;
  }

	saveParticularMembership(membership: ParticularMembership): void {
		this.memberships.push(membership as unknown as Membership);
	}
}