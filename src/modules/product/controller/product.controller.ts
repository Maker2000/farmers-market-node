import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AllowAnonymous, CtxUser } from '@/decorators/decorators';
import { CreateProductDto } from '../domain/product.dto';
import { ProductService } from '../service/product/product.service';

@Controller('product')
export class ProductController {
  constructor(private svc: ProductService) {}
  @AllowAnonymous()
  @Get(':id')
  getProduct(@CtxUser() user: string, @Param('id') id: string) {
    return user;
    return this.svc.getProduct(id);
  }
  // @AllowAnonymous()
  @Get('')
  getAllProducts(@CtxUser() user: string) {
    return user;
    return this.svc.getAllProducts();
  }
  @AllowAnonymous()
  @Post('')
  createProduct(@CtxUser() user: string, @Body() dto: CreateProductDto) {
    return user;
    return this.svc.createProduct(user, dto);
  }
}
