import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RawMaterial, RawMaterialDocument } from "../schema/rawMaterial.schema";
import { RawMaterialDto, ProductDto } from "../schema/DTO";
import { Product, ProductDocument } from "src/schema/product.schema";



@Injectable()
export class AppManager {
    constructor(
        @InjectModel(RawMaterial.name) private rawMaterialModel: Model<RawMaterialDocument>,
        @InjectModel(Product.name) private productModel: Model<ProductDocument>
    ) {}

    async findProduct(barcode: string): Promise<ProductDto> {
        const product = await this.productModel.findOne({barcode: barcode}).exec();
        
        if(product) {
            console.log(`Success to find Product in DB`);
        } else {
            console.log("Can't find Product with barcode in DB");
        }
        
        return product;
    }

    async createProduct(product: ProductDto) {
        const createdProduct = new this.productModel(product);
        return createdProduct.save();
    }

    async findRawMaterials(rawMaterialNames: string[]): Promise<RawMaterialDto[]> {
        return await this.rawMaterialModel.find().where("name").in(rawMaterialNames).exec();
    }

    async updateRawMaterials(rawMaterials: RawMaterialDto[]) {
        const querys = rawMaterials.map(rawMaterial => {
            this.rawMaterialModel.updateOne(
                { name: rawMaterial.name }, 
                { edible: rawMaterial.edible },
                { upsert: true }
            ).exec();
        });
        await Promise.all(querys);
    }
}