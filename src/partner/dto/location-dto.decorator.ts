import { SetMetadata } from '@nestjs/common';

export const LocationDto = (...args: string[]) => SetMetadata('location-dto', args);
