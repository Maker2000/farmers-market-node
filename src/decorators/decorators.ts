import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { UserMini } from 'src/guards/auth/auth.guard';

export const ALLOW_ANONYMOUS = 'allowAnonymous';
export const AllowAnonymous = () => SetMetadata(ALLOW_ANONYMOUS, true);
export const CtxUser = createParamDecorator<any, any, UserMini>(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user as UserMini;
  },
);
