import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RoleEnum } from "@server/users/types/types";

export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(userRole: RoleEnum, requiredRoles: RoleEnum[]) {
    if (userRole == RoleEnum.SUPERADMIN) {
      return true;
    }

    return requiredRoles.includes(userRole);
  }

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.get("roles", context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return this.matchRoles(user.role_type, requiredRoles);
  }
}
