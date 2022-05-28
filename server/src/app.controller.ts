import { Body, Controller, Get, HttpStatus, Post, Query, Req, Res,  } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppManager } from './app.manager';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly appManager: AppManager) {}

  @Get("/raw-materials")
  async getRawMaterials(@Query() query: {barcode: string}) {
    
    
    const productReportNumbers = await this.appService.getProductReportNumbers(query.barcode);
    const rawMaterials = await this.appService.getRawMaterials(productReportNumbers);
  
    return JSON.stringify(rawMaterials);
  }

  @Get("/hello")
  sayHello() {
    return "hello";
  }

  @Post("/update")
  async updateRawMaterials(@Body() body, @Res() res: Response) {
    // console.log(body)
    try {
      const rawMaterials = body;
      console.log(rawMaterials);
      await this.appManager.update(rawMaterials);
      res.status(HttpStatus.OK).send("Success to update");
    } catch(e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  }
}
