import { Injectable } from '@nestjs/common';
import { AppManager } from './app.manager';
import { RawMaterialDto } from '../schema/DTO';
import { fetchProductReportNumber, fetchRawMaterialNames } from 'src/fetch/fetch';

@Injectable()
export class AppService {
  constructor(private readonly appManager: AppManager) {}

  async getRawMaterials(barcode: string): Promise<RawMaterialDto[]> {
    const savedProduct = await this.appManager.findProduct(barcode);
    let rawMaterialNames = [];

    if(savedProduct) {
      rawMaterialNames = savedProduct.rawMaterialNames;
    } else {
      const productReportNumbers = await fetchProductReportNumber(barcode);
      rawMaterialNames = await fetchRawMaterialNames(productReportNumbers);

      await this.appManager.createProduct({barcode: barcode, rawMaterialNames: rawMaterialNames});
    }

    const savedRawMaterials = await this.appManager.findRawMaterials(rawMaterialNames);
    const rawMaterials = rawMaterialNames.map(name => {
      const savedRawMaterial = savedRawMaterials.find(rm => rm.name === name);
      return (savedRawMaterial) ? savedRawMaterial : {name: name, isVegetable: -1}
    })

    return rawMaterials;
  }
}