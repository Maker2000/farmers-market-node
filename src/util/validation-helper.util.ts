import { ValidationArguments } from 'class-validator';
import { ClientValidationException } from 'src/exceptions/custom-http.exception';
import './../extensions/string.extensions.js';
export class ValidationHelper {
  static getEnumMessage(arg: ValidationArguments, className: Object): string {
    let data = Object.keys(className)
      .filter((x) => isNaN(Number.parseInt(x)))
      .join(', ');

    return `The ${arg.property.camelCaseToSentenceCase()} needs to be: ${data}`;
  }
}
export class ClientValidationHelper {
  /**
   * Checks if condition is true and throws a validation exception to the client
   * @param condition
   * @param title
   * @param message
   */
  static require(
    condition: boolean | undefined,
    title: string,
    message: string,
  ): void {
    condition ??= false;
    if (!condition)
      throw new ClientValidationException([
        <ClientError>{ title: title, message: message },
      ]);
  }

  // static warnRequire(
  //   condition: boolean | undefined,
  //   title: string,
  //   message: string,
  // ): void {
  //   condition ??= false;
  //   if (!condition) throw new ClientValidationException(title, message, 201);
  // }
  /**
   * Checks if parent condition is true then runs a requires for the child condition
   * @param parentCondition
   * @param childCondition
   * @param title
   * @param message
   */
  static compoundRequire(
    parentCondition: boolean | undefined,
    childCondition: boolean | undefined,
    title: string,
    message: string,
  ): void {
    parentCondition ??= false;
    if (parentCondition) {
      this.require(childCondition, title, message);
    }
  }

  /**
   * Checks if object is null and throws a validation exception to the client
   * @param obj
   * @param title
   * @param message
   */
  static requireNotNull(obj: any, title: string, message: string): void {
    if (!obj)
      throw new ClientValidationException([
        <ClientError>{ title: title, message: message },
      ]);
  }

  /**
   * Checks if object is not null and throws a validation exception to the client
   * @param obj
   * @param title
   * @param message
   */
  static requireNull(obj: any, title: string, message: string): void {
    if (obj)
      throw new ClientValidationException([
        <ClientError>{ title: title, message: message },
      ]);
  }

  /**
   * Checks if object is not null or empty and throws a validation exception to the client
   * @param obj
   * @param title
   * @param message
   */
  static requireNotNullOrEmpty(
    obj: string,
    title: string,
    message: string,
  ): void {
    if (obj.isNullOrEmpty())
      throw new ClientValidationException([
        <ClientError>{ title: title, message: message },
      ]);
  }
}
export interface ClientError {
  title: string;
  message: string;
}
