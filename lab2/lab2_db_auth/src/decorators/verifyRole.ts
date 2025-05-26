// verify-role.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { jwtPayload } from 'src/lib/interfaces';

export const VerifyRole = createParamDecorator(
  (role: string, ctx: ExecutionContext): jwtPayload | null => {
    const request: Request = ctx.switchToHttp().getRequest();
    const user = request['jwtPayload'] as jwtPayload;

    return user?.role === role ? user : null;
  },
);
