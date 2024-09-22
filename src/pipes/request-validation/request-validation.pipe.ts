import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ClientValidationException } from 'src/exceptions/custom-http.exception';

@Injectable()
export class RequestValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new ClientValidationException(
        this.flattenValidationErrors(errors).map(
          (x) =>
            <ValidationItem>{
              field: x.property,
              message: Object.values(
                JSON.parse(JSON.stringify(x.constraints)),
              ).toString(),
            },
          // Object.values(
          //   JSON.parse(JSON.stringify(x.constraints)),
          // )[0].toString(),
        ),
      );
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
  private flatten(validationErrors: ValidationError[], delimiter: string): any {
    return validationErrors.flatMap((error) => {
      if (!error.children || error.children.length === 0) {
        let { children, ...flattenedChild } = error;

        return [flattenedChild];
      }

      const flattenedChildren = this.flatten(error.children, delimiter);
      return flattenedChildren.map((child: any) => {
        return {
          ...child,
          property: error.property + delimiter + child.property,
        };
      });
    });
  }

  private flattenValidationErrors(
    validationErrors: ValidationError[],
    options: Options = {},
  ): ValidationError[] {
    if (options.omitErrorsMessages && options.omitErrorsNames)
      throw 'omitErrorsMessages and omitErrorsNames options are not meant to be used together';

    let flattenedArray = this.flatten(
      validationErrors,
      options.delimiter || '.',
    );

    if (options.omitErrorsMessages || options.omitErrorsNames) {
      flattenedArray = flattenedArray.map((error: any) => {
        return {
          ...error,
          constraints: options.omitErrorsMessages
            ? Object.keys(error.constraints)
            : Object.keys(error.constraints).map(
                (key) => error.constraints[key],
              ),
        };
      });
    }

    return flattenedArray as ValidationError[];
  }
}
interface Options {
  /*
   *  Delimiter with which the path should be concatenated.
   *  Default: .
   */
  delimiter?: string;

  /*
   *  Should errors messages be omitted?
   *  If true, constraints property will be an array of the constraints names
   *  Default: false
   */
  omitErrorsMessages?: boolean;

  /*
   *  Should errors names be omitted?
   *  If true, constraints property will be an array of the constraints messages
   *  Default: false
   */
  omitErrorsNames?: boolean;
}
interface ValidationItem {
  field: string;
  message: string;
}
