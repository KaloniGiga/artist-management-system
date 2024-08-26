import { SetMetadata } from "@nestjs/common";
import { RoleEnum } from "@server/users/types/types";

export const Roles = (...args: RoleEnum[]) => SetMetadata("roles", args);
