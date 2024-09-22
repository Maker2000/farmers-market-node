import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './domain/user.schema';
import { UserService } from './service/user.service';
import { PaymentMethodController } from './controller/payment-method/payment-method.controller';
import { UserController } from './controller/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController, PaymentMethodController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
