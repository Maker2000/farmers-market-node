import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IDbEntity } from 'src/entities/idb.entity';
import { CardType, ProductCategory } from 'src/util/enums.util';

export type ProductDocument = HydratedDocument<Product>;
@Schema()
export class Product extends IDbEntity {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  productName: string;
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  imageUrl: string;
  @Prop({
    required: true,
    enum: ProductCategory,
    type: mongoose.Schema.Types.String,
  })
  category: ProductCategory;
  @Prop({ required: true, type: mongoose.Schema.Types.Number })
  amount: number;
  @Prop({ required: true, type: mongoose.Schema.Types.Number })
  pricePerUnit: number;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
