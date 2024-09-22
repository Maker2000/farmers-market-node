import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { Occupation, UserRole } from 'src/util/enums.util';
import { ValidationHelper } from 'src/util/validation-helper.util';
export class AddressDto {
  @IsNotEmpty({
    message: 'Address line 1 is required for this request.',
  })
  address1: string;
  address2?: string;
  @IsNotEmpty({
    message: 'Address city is required for this request.',
  })
  city: string;
  @IsNotEmpty({
    message: 'Address subdivision/state is required for this request.',
  })
  subdivision: string;
  @IsNotEmpty({
    message: 'Address zip is required for this request.',
  })
  zip: string;
}
export class CreateUserDto {
  @IsNotEmpty({
    message: 'The username is required for this request.',
  })
  userName: string;
  @IsNotEmpty({
    message: 'The email is required for this request.',
  })
  @IsEmail(
    {},
    {
      message: 'The attached email needs to be a valid email',
    },
  )
  email: string;
  @IsNotEmpty({
    message: 'The password is required for this request.',
  })
  password: string;
  @IsNotEmpty({
    message: 'The first name is required for this request.',
  })
  firstName: string;
  @IsNotEmpty({
    message: 'The last name is required for this request.',
  })
  lastName: string;
  @IsEnum(UserRole, {
    message: (v) => ValidationHelper.getEnumMessage(v, UserRole),
  })
  role: UserRole;
  @IsEnum(Occupation, {
    message: (v) => ValidationHelper.getEnumMessage(v, Occupation),
  })
  occupation: Occupation;
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  address: AddressDto;
}

export class UpdateUserPasswordDto {
  @IsNotEmpty({
    message: 'The validation code is required for this request.',
  })
  validationCode: string;
  @IsNotEmpty({
    message: 'The password is required for this request.',
  })
  password: string;
}

export class LoginUserDto {
  @IsNotEmpty({
    message: 'The username is required for this request.',
  })
  userName: string;
  @IsNotEmpty({
    message: 'The password is required for this request.',
  })
  password: string;
}
