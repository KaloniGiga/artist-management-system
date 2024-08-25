import { GenderEnum, RoleEnum } from "@web/types/types";

export const selectGenderList = [
  { value: GenderEnum.FEMALE, label: "Female" },
  { value: GenderEnum.MALE, label: "Male" },
  { value: GenderEnum.OTHER, label: "Other" },
];

export const selectUserRoleList = [
  { value: RoleEnum.SUPERADMIN, label: "Super Admin" },
  { value: RoleEnum.ARTIST, label: "Artist" },
  { value: RoleEnum.ARTISTMANAGER, label: "Artist Manager" },
];
