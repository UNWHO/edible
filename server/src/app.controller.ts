import { Controller, Get, Query, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/raw-materials")
  async getRawMaterials(@Query() query: {barcode: string}, @Response() res) {
    res.header("Access-Control-Allow-Origin", "*");
    
    const productReportNumbers = await this.appService.getProductReportNumbers(query.barcode);
    const rawMaterials = await this.appService.getRawMaterials(productReportNumbers);
  
    res.send(JSON.stringify(rawMaterials));
  }

  @Get("/hello")
  sayHello() {
    return "hello";
  }
}
