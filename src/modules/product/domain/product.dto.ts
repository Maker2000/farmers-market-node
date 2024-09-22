import { IsNotEmpty } from 'class-validator';
import { ProductCategory } from 'src/util/enums.util';

export class CreateProductDto {
  @IsNotEmpty({
    message: 'The username is required for this request.',
  })
  userId: string;
  productName: string;
  imageUrl: string;
  category: ProductCategory;
  amount: number;
  pricePerUnit: number;
}
