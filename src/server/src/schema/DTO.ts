export type RawMaterialDto = {
    name: string,
    isVegetable: number
}

export type ProductDto = {
    barcode: string,
    rawMaterialNames: Array<string>
}