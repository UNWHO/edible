import { Injectable } from '@nestjs/common';
import { AppManager } from './app.manager';
import { RawMaterialDto, ResponseProductDto } from '../schema/DTO';
import { fetchProduct, fetchRawMaterialNames } from 'src/fetch/fetch';

@Injectable()
export class AppService {
  constructor(private readonly appManager: AppManager) {}

  async getProduct(barcode: string): Promise<ResponseProductDto> {
    const savedProduct = await this.appManager.findProduct(barcode);
    let rawMaterialNames = [];
    let productName = "";

    if(savedProduct) {
      rawMaterialNames = savedProduct.rawMaterialNames;
      productName = savedProduct.name;
    } else {
      const product = await fetchProduct(barcode);
      if(product === null) return null;

      productName = product.name;

      rawMaterialNames = await fetchRawMaterialNames(product.productReportNumbers);
      if(rawMaterialNames === null) return null;

      await this.appManager.createProduct({barcode: barcode, name:product.name, rawMaterialNames: rawMaterialNames});
    }

    const savedRawMaterials = await this.appManager.findRawMaterials(rawMaterialNames);
    const rawMaterials = rawMaterialNames.map(name => {
      const savedRawMaterial = savedRawMaterials.find(rm => rm.name === name);
      return (savedRawMaterial) ? savedRawMaterial : {name: name, edible: undefined}
    })

    return {
      barcode: barcode,
      name: productName,
      rawMaterials: rawMaterials
    }
  }
}