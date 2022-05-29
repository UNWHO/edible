import fetch from 'node-fetch'

const apiKey = process.env.API_KEY;
const url = "http://openapi.foodsafetykorea.go.kr/api";

export const fetchProductReportNumber = async function(barcode: string): Promise<string[]> {
    console.log(process.env.API_KEY)
    const serviceId = "C005";
    
    try {
      const result = await fetch(`${url}/${apiKey}/${serviceId}/json/1/10/BAR_CD=${barcode}`) as any;
      console.log("Product Report Number Fetched");

      const json = await result.json();
      console.log("Fetched Product Report Number parsed to JSON Object");

      console.log(`${json.C005.row.length} Product Report Number parsed`);

      return json.C005.row.map(elm => elm.PRDLST_REPORT_NO);

    } catch(e) {
      console.log("Failed to get Product Report Number : " + e);
    }
    return [];
}

export const fetchRawMaterialNames = async function(productReportNumbers: string[]): Promise<string[]> {
    const serviceId = "C002";
    const rawMaterialNames = new Set<string>();

    try {
        for await(const number of productReportNumbers) {
          const result = await fetch(`${url}/${apiKey}/${serviceId}/json/1/10/PRDLST_REPORT_NO=${number}`) as any;
          console.log("Raw Materials API Fetched");
  
          const json = await result.json();
          console.log("Raw Material JSON Object parsed");
  
          if(json.C002.row !== undefined) {
            const fetchedRawMaterialNames = json.C002.row[0].RAWMTRL_NM.split(",") as Array<string>;
            fetchedRawMaterialNames.forEach(name => rawMaterialNames.add(name));
          }
        } 
      } catch(e) {
        console.log("Failed to get Raw Materials : " + e);
      }

    return Array.from(rawMaterialNames);
}