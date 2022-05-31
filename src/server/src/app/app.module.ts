import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppManager } from './app.manager';
import { AppService } from './app.service';
import { RawMaterial, RawMaterialSchema } from '../schema/rawMaterial.schema';
import { Product, ProductSchema } from 'src/schema/product.schema';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath: join(__dirname, "..", "..", "static")}),
    MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.a3nqh1s.mongodb.net/?retryWrites=true&w=majority`),
    MongooseModule.forFeature([{name: RawMaterial.name, schema: RawMaterialSchema}]),
    MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}])
  ],
  controllers: [AppController],
  providers: [AppService, AppManager],
})
export class AppModule {}
