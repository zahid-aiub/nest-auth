
import { ReflectMetadata} from '@nestjs/common';
import {Role} from "../auth/role.enum";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => ReflectMetadata (ROLES_KEY, roles);