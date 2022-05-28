import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppManager } from './app.manager';
import { AppService } from './app.service';
import { RawMaterial, RawMaterialSchema } from './schema/rawMaterial.schema';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://admin:admin@cluster0.a3nqh1s.mongodb.net/?retryWrites=true&w=majority"),
    MongooseModule.forFeature([{name: RawMaterial.name, schema: RawMaterialSchema}])
  ],
  controllers: [AppController],
  providers: [AppService, AppManager],
})
export class AppModule {}
