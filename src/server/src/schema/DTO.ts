export type RawMaterialDto = {
    name: string,
    edible: true | false | undefined;
}

export type ProductDto = {
    barcode: string,
    name: string,
    rawMaterialNames: Array<string>
}

export type FetchedProductDto = {
    name: string,
    productReportNumbers: Array<string>
}

export type ResponseProductDto = {
    barcode: string,
    name: string,
    rawMaterials: Array<RawMaterialDto>
}
