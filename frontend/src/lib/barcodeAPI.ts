const keyId = "57242a95cb1f448f961e";
const url = "http://openapi.foodsafetykorea.go.kr/api/";

export const fetchBarcodeInfo = async (barcode: string) => {
    const serviceId = "C005";
    const result = await fetch(`${url}/${keyId}/${serviceId}/json/1/10/BAR_CD=${barcode}`);

    
    const json = await result.json();
    return json.C005.row.map(elm => elm.PRDLST_REPORT_NO);
}

export const fetchIngredientsInfo = async(productsNum: string[]) => {
    const ingredients = new Set<string>();
    const serviceId = "C002";

    for await(const productNum of productsNum) {
        const result = await fetch(`${url}/${keyId}/${serviceId}/json/1/10/PRDLST_REPORT_NO=${productNum}`);
        const json = await result.json();

        console.log(json);
        if(json.C002.row !== undefined) {
            const rawIngredients = json.C002.row[0].RAWMTRL_NM.split(",") as Array<string>;
            rawIngredients.forEach(rawIngredient => ingredients.add(rawIngredient));
        }
    }

    console.log(ingredients)

    return Array.from(ingredients);
}