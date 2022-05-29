import { Body, Controller, Get, HttpStatus, Post, Query, Req, Res,  } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppManager } from './app.manager';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly appManager: AppManager) {}

  @Get("/raw-materials")
  async getRawMaterials(@Query() query: {barcode: string}) {
    return this.appService.getRawMaterials(query.barcode);
  }

  @Get("/hello")
  sayHello() {
    return "hello";
  }

  @Post("/update")
  async updateRawMaterials(@Body() body, @Res() res: Response) {
    try {
      const rawMaterials = body;
      await this.appManager.updateRawMaterials(rawMaterials);
      res.status(HttpStatus.OK).send("Success to update");
    } catch(e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  }
}
