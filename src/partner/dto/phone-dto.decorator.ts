import { SetMetadata } from '@nestjs/common';

export const PhoneDto = (...args: string[]) => SetMetadata('phone-dto', args);
