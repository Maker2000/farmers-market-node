import { Prop } from '@nestjs/mongoose';

export class IDbEntity {
  @Prop({ required: true, default: new Date() })
  createdAt: Date;
  @Prop({ required: true, default: new Date() })
  lastUpdated: Date;
  @Prop({ required: true, default: false })
  isDeleted: boolean;
}
