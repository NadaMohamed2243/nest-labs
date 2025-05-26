import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class IsAuthonticatedMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    //extract token from headers
    const bearerToken = req.headers['authorization'];
    if (!bearerToken) {
      throw new UnauthorizedException('Authorization header is missing');
    }
    const token = bearerToken.split(' ')[1];
    let payload;
    try {
      payload = jwt.verify(
        token,
        this.configService.getOrThrow<string>('JWT_SECRET'),
      );
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    req['jwtPayload'] = payload; 

    next();
  }
}
