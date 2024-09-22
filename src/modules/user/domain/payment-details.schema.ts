import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IDbEntity } from 'src/entities/idb.entity';
import { CardType } from 'src/util/enums.util';

type PaymentMethodDocument = HydratedDocument<PaymentMethod>;
@Schema()
class PaymentMethod extends IDbEntity {
  @Prop({ enum: CardType, required: true, type: mongoose.Schema.Types.String })
  cardType: CardType;
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  cardNumber: string;
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  nameOnCard: string;
  @Prop({ required: true, type: mongoose.Schema.Types.Date })
  expireDate: Date;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;
}

const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);
export { PaymentMethodDocument, PaymentMethod, PaymentMethodSchema };
