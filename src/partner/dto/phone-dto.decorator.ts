import { SetMetadata } from '@nestjs/common';

export const PhoneDTO = (...args: string[]) => SetMetadata('phone-dto', args);
