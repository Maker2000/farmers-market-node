import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { AuthorizationException } from 'src/exceptions/custom-http.exception';
import { Request } from 'express';
import { ALLOW_ANONYMOUS } from 'src/decorators/decorators';
import { UserRole } from 'src/util/enums.util';
import { UserService } from 'src/modules/user/service/user.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      ALLOW_ANONYMOUS,
      [context.getHandler(), context.getClass()],
    );
    if (isPublic) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    var jwtToken = this.extractTokenFromHeader(req);
    if (!jwtToken) throw new AuthorizationException();
    try {
      let userData: AuthJWT = await this.jwtService.verifyAsync(jwtToken, {
        secret: process.env.JWT_SECRET,
      });
      console.log(userData);
      var miniUser = await this.userService.getUserByUserName(
        userData.username,
      );
      console.log(miniUser);
      req.user = miniUser;
    } catch (e) {
      console.log(e);
      throw new AuthorizationException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

export interface AuthJWT {
  username: string;
  token: string;
}
export interface UserMini {
  id: string;
  username: string;
  role: UserRole;
}
