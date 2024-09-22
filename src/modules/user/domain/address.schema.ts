import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

class Address {
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  address1: string;
  @Prop({ type: mongoose.Schema.Types.String })
  address2?: string;
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  city: string;
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  subdivision: string;
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  zip: string;
}
const AddressSchema = SchemaFactory.createForClass(Address);
export { Address, AddressSchema };
