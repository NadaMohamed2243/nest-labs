import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { jwtPayload } from 'src/lib/interfaces';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request['jwtPayload'] as jwtPayload;
  },
);
