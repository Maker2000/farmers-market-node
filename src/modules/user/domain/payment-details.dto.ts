import { CardType } from 'src/util/enums.util';
import { Address } from './address.schema';

export class PaymentDetailsDto {
  cardType: CardType;
  cardNumber: string;
  nameOnCard: string;
  expireDate: Date;
  userId: string;
  billindAddress: Address;
}
