import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { IDbEntity } from 'src/entities/idb.entity';
import { Occupation, UserRole } from 'src/util/enums.util';
import { MongoUtils } from 'src/util/mongo.util';
import { Address, AddressSchema } from './address.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      MongoUtils.removeExtraData(doc, ret);
      delete ret.password;
    },
  },
  toObject: {
    transform: (doc, ret) => {
      MongoUtils.removeExtraData(doc, ret);
      delete ret.password;
    },
  },
})
class User extends IDbEntity {
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  userName: string;
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  email: string;
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  password: string;
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  firstName: string;
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  lastName: string;
  @Prop({ enum: UserRole, required: true, type: mongoose.Schema.Types.String })
  role: UserRole;
  @Prop({
    enum: Occupation,
    required: true,
    type: mongoose.Schema.Types.String,
  })
  occupation: Occupation;
  @Prop({ required: true, type: AddressSchema })
  address: Address;
}

const UserSchema = SchemaFactory.createForClass(User);
export { User, UserSchema };
