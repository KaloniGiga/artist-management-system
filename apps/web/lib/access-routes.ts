/* eslint-disable @typescript-eslint/no-unused-vars */
import { RoleEnum } from "@web/types/types";

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

export const forwardRoute = {
  [RoleEnum.SUPERADMIN]: "/dashboard",
  [RoleEnum.ARTISTMANAGER]: "/dashboard/artists",
  [RoleEnum.ARTIST]: (artistId: number) => `/dashboard/songs/${artistId}`,
};
