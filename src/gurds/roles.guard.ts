import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import {Role} from "../enums/role.enum";
import {ROLES_KEY} from "../decorators/roles.decorator";
import {Reflector} from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            console.log("------> "+ requiredRoles);
            return true;
        }

        console.log("==========>"+ requiredRoles);
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => user.roles?.includes(role));
    }
}