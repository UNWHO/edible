import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type RawMaterialDocument = RawMaterial & Document;

@Schema()
export class RawMaterial {
    @Prop()
    name: string;

    @Prop()
    isVegetable: number;
}

export const RawMaterialSchema = SchemaFactory.createForClass(RawMaterial);