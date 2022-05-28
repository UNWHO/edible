import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import fetch from 'node-fetch'
import { AppManager } from './app.manager';
import { rawMaterialDto } from './schema/DTO';
import { RawMaterial, RawMaterialDocument } from './schema/rawMaterial.schema';

@Injectable()
export class AppService {
  constructor(private readonly appManager: AppManager) {}

  private keyId: string = "57242a95cb1f448f961e";
  private url = "http://openapi.foodsafetykorea.go.kr/api/";

  async getProductReportNumbers(barcode: string): Promise<string[]> {
    const serviceId = "C005";
    console.log("Get Product Report Number API called");
    try {
      const result = await fetch(`${this.url}/${this.keyId}/${serviceId}/json/1/10/BAR_CD=${barcode}`) as any;
      console.log("Product Report Number API Fetched");

      const json = await result.json();
      console.log("Product Report Number JSON Object parsed");

      console.log(`${json.C005.row.length} product reported`);

      return json.C005.row.map(elm => elm.PRDLST_REPORT_NO);

    } catch(e) {
      console.log("Failed to get Product Report Number : " + e);
    }
    return [];
  }

  async getRawMaterials(productReportNumbers: string[]): Promise<rawMaterialDto[]> {
    const rawMaterialNames = new Set<string>();
    const serviceId = "C002";

    console.log("Get Raw Materials API called");

    try {
      for await(const number of productReportNumbers) {
        const result = await fetch(`${this.url}/${this.keyId}/${serviceId}/json/1/10/PRDLST_REPORT_NO=${number}`) as any;
        console.log("Raw Materials API Fetched");

        const json = await result.json();
        console.log("Raw Material JSON Object parsed");

        if(json.C002.row !== undefined) {
          const rawIngredients = json.C002.row[0].RAWMTRL_NM.split(",") as Array<string>;
          rawIngredients.forEach(rawIngredient => rawMaterialNames.add(rawIngredient));
        }
      } 

      
      const savedRawMaterials = await this.appManager.findAll(Array.from(rawMaterialNames));
      console.log(savedRawMaterials);
      return Array.from(rawMaterialNames).map(name => {
        const savedRawMaterial = savedRawMaterials.find(rm => rm.name === name);
        return (savedRawMaterial) ? savedRawMaterial : {name: name, isVegetable: -1}
      })
      
      return 
    } catch(e) {
      console.log("Failed to get Raw Materials : " + e);
    }
    
  }



}
