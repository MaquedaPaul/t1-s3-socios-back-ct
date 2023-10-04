 
import { Controller, Get, Res } from '@nestjs/common';
import { LiquidService } from './liquid.service';
import { Response } from 'express';

@Controller()
export class AppController {
  private liquidService: LiquidService;

  constructor() {
    this.liquidService = new LiquidService();
  }

  @Get('/')
  async getHome(@Res() res: Response) {
    const liquidEngine = this.liquidService.getLiquidEngine();
    

    liquidEngine.renderFile('layout').then((html) => {
      console.log(html);
      res.send(html);
    });
  }

  @Get('/socios')
  async getAssociates(@Res() res: Response) {
    const liquidEngine = this.liquidService.getLiquidEngine();
    const lists = {categories: [
      { id: 1, name: 'Categoría 1' },
      { id: 2, name: 'Categoría 2' },
      { id: 3, name: 'Categoría 3' },
    ],
    parnerTypes: [
      { id: 1, name: 'Camara' },
      { id: 2, name: 'Empresa' },
    ]};
  
    liquidEngine.renderFile('layout',lists).then((html) => {
      console.log(html);
      res.send(html);
    });
  }
}