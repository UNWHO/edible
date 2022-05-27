import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch'

@Injectable()
export class AppService {
  private keyId: string = "57242a95cb1f448f961e";
  private url = "http://openapi.foodsafetykorea.go.kr/api/";

  async getProductReportNumbers(barcode: string): Promise<string[]> {
    const serviceId = "C005";
    const result = await fetch(`${this.url}/${this.keyId}/${serviceId}/json/1/10/BAR_CD=${barcode}`) as any;

    const json = await result.json();
    return json.C005.row.map(elm => elm.PRDLST_REPORT_NO);
  }

  async getRawMaterials(productReportNumbers: string[]): Promise<string[]> {
    const ingredients = new Set<string>();
    const serviceId = "C002";

    for await(const number of productReportNumbers) {
        const result = await fetch(`${this.url}/${this.keyId}/${serviceId}/json/1/10/PRDLST_REPORT_NO=${number}`) as any;
        const json = await result.json();

        if(json.C002.row !== undefined) {
          const rawIngredients = json.C002.row[0].RAWMTRL_NM.split(",") as Array<string>;
          rawIngredients.forEach(rawIngredient => ingredients.add(rawIngredient));
        }
    }

    return Array.from(ingredients);
  }
}
