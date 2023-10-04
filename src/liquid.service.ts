import { Injectable } from '@nestjs/common';
import { Liquid } from 'liquidjs';

@Injectable()
export class LiquidService {
  private engine: Liquid;

  constructor() {
    this.engine = new Liquid({
      root: ['public/views/', 'public/views/partials/', 'public/views/partials/table/'],
      extname: '.liquid',
    });
  }

  getLiquidEngine(): Liquid {
    return this.engine;
  }
}
