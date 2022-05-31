import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type RawMaterialDocument = RawMaterial & Document;

@Schema()
export class RawMaterial {
    @Prop()
    name: string;

    @Prop()
    edible: true | false | undefined;
}

export const RawMaterialSchema = SchemaFactory.createForClass(RawMaterial);