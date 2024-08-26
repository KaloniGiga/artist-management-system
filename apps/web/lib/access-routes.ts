/* eslint-disable @typescript-eslint/no-unused-vars */
import { RoleEnum } from "@web/types/types";

/**
 * Super admin: has access to all routes
 * Artist manager: has access to artists and songs route
 * Artist: has access to only his own songs.
 */
const rolePermission = {
  [RoleEnum.SUPERADMIN]: (_route: string) => true,
  [RoleEnum.ARTISTMANAGER]: (route: string) => {
    const artistManagerRoutes = [
      "/dashboard/artists",
      /^\/dashboard\/songs\/\d+$/,
    ];

    return artistManagerRoutes.some((routeItem) =>
      typeof routeItem == "string"
        ? routeItem === route
        : routeItem.test(route),
    );
  },
  [RoleEnum.ARTIST]: (route: string, artistId: number | null) => {
    const artistRoute = [`/dashboard/songs/${artistId}`];
    return artistRoute.includes(route);
  },
};

/**
 * @param (role, route, artistId)
 * @description checks if the given role has access to the route
 */
export const matchRoutes = (
  role: RoleEnum,
  route: string,
  artistId: number | null = null,
) => {
  const checkPermission = rolePermission[role];
  if (checkPermission) {
    return checkPermission(route, artistId);
  }
  return false;
};

/**
 * Object to resolve the target route for different roles after user logged in,
 */
export const forwardRoute = {
  [RoleEnum.SUPERADMIN]: "/dashboard",
  [RoleEnum.ARTISTMANAGER]: "/dashboard/artists",
  [RoleEnum.ARTIST]: (artistId: number | null) =>
    artistId ? `/dashboard/songs/${artistId}` : "/",
};
