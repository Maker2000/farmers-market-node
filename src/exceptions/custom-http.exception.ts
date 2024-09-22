import { HttpException } from '@nestjs/common';

class CustomHttpException extends HttpException {
  constructor(title: string, statusCode: number, message: string) {
    super(title, statusCode, { description: message });
  }
}
class NotFoundException extends CustomHttpException {
  constructor(detail: string) {
    super('Not found', 404, detail);
  }
}
export class AuthorizationException extends CustomHttpException {
  constructor() {
    super(
      'Unauthorized',
      401,
      'You are not authorized to access the requested resource',
    );
  }
}
export class ClientValidationException extends HttpException {
  constructor(errors: Array<any>) {
    super(errors, 400);
  }
}
