import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/raw-materials")
  async getRawMaterials(@Query() query: {barcode: string}): Promise<string> {
    const productReportNumbers = await this.appService.getProductReportNumbers(query.barcode);
    const rawMaterials = await this.appService.getRawMaterials(productReportNumbers);

    return JSON.stringify(rawMaterials);
  }

  @Get("/hello")
  sayHello() {
    return "hello";
  }
}
