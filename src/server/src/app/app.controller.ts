import { Body, Controller, Get, HttpStatus, Post, Query, Req, Res,  } from '@nestjs/common';
import { Request, Response } from 'express';
import { send } from 'process';
import { RawMaterialDto } from 'src/schema/DTO';
import { AppManager } from './app.manager';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly appManager: AppManager) {}

  @Get("/raw-materials")
  async getRawMaterials(@Query() query: {barcode: string}, @Res() res: Response) {
    const product = await this.appService.getProduct(query.barcode);
    if(product === null) 
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    
    res.send(product);
  }

  @Get("/")
  sayHello() {
    return "hello";
  }

  
  @Get("/ping")
  ping() {
    return "ping";
  }

  @Post("/update")
  async updateRawMaterials(@Body() body, @Res() res: Response) {
    try {
      const rawMaterials: RawMaterialDto[] = body;
      await this.appManager.updateRawMaterials(rawMaterials);
      res.status(HttpStatus.OK).send("Success to update");
    } catch(e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  }
}
