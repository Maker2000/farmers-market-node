import { Module } from '@nestjs/common';
import { Product, ProductSchema } from './domain/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product/product.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
