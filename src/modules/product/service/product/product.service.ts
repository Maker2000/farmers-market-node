import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../../domain/product.dto';
import { Product } from '../../domain/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/user/domain/user.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  createProduct(userId: string, dto: CreateProductDto): Promise<Product> {
    return this.productModel.create({
      userId: userId,
      ...dto,
    });
  }
  tryGetProductById(id: string): Promise<Product | null> {
    return this.productModel.findById(id).exec();
  }
  getProductById(id: string): Promise<Product> {
    return this.tryGetProductById(id).requireEntityFound(
      'Unable to find the product requested',
    );
  }
  getProduct(id: string): Promise<Product> {
    return this.getProductById(id);
  }
  getAllProducts(): Promise<Array<Product>> {
    return this.productModel.find().exec();
  }
}
