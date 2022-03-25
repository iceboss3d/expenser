import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse } from 'src/helpers/apiResponse';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      return false;
    }
    request.user = await this.validateToken(request.headers.authorization);

    return true;
  }

  async validateToken(auth: string) {
    return new Promise((res, rej) => {
      if (auth.split(' ')[0] !== 'Bearer') {
        rej(ApiResponse.fail('Invalid Token', HttpStatus.UNAUTHORIZED));
      }

      const token = auth.split(' ')[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded: any) => {
        if (err) {
          const message = err.message;
          rej(ApiResponse.fail(message, HttpStatus.UNAUTHORIZED));
        }

        res(decoded);
      });
    });
  }
}
