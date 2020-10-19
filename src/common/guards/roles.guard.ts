import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // console.log('context', context);
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles);
    const name = context.getHandler().name;
    console.log('class', context.getClass().name);
    console.log('name', name);

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    console.log('request', request);
    const user = request.user;
    const hasRole = () => user.roles.some((role) => !!roles.find((item) => item === role));

    return user && user.roles && hasRole();
  }
}
