import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RawMaterial, RawMaterialDocument } from "./schema/rawMaterial.schema";
import { rawMaterialDto } from "./schema/DTO";



@Injectable()
export class AppManager {
    constructor(@InjectModel(RawMaterial.name) private rawMaterialModel: Model<RawMaterialDocument>) {}

    create(createRawMaterialDto: rawMaterialDto) {
        const createdRawMaterial = new this.rawMaterialModel(createRawMaterialDto);
        return createdRawMaterial.save();
    }

    async find(rawMaterialName: string) {
        return await this.rawMaterialModel.find().where("name").equals(rawMaterialName).exec();
    }

    async findAll(rawMaterialNames: string[]) {
        return await this.rawMaterialModel.find().where("name").in(rawMaterialNames).exec();
    }

    async update(rawMaterials: rawMaterialDto[]) {
        try {
            const querys = rawMaterials.map(rawMaterial => {
                this.rawMaterialModel.updateOne(
                    {
                        name: rawMaterial.name
                    },
                    {
                       isVegetable: rawMaterial.isVegetable
                    },
                    {
                        upsert: true
                    }
                ).exec();
            });
            await Promise.all(querys);
        } catch(e) {
            return "Manager: Failed to update - " + e;
        }

        return "Success to update";
        
    }
    
}