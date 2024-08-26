import { GenderEnum, GenreEnum, RoleEnum } from "@web/types/types";

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

export const selectGenreList = [
  { value: GenreEnum.RNB, label: "RNB" },
  { value: GenreEnum.CLASSIC, label: "Classic" },
  { value: GenreEnum.COUNTRY, label: "Country" },
  { value: GenreEnum.JAZZ, label: "Jazz" },
  { value: GenreEnum.ROCK, label: "Rock" },
];

export const userRoleLabel = {
  [RoleEnum.ARTIST]: "Artist",
  [RoleEnum.ARTISTMANAGER]: "Artist Manager",
  [RoleEnum.SUPERADMIN]: "Super Admin",
};

export const genderLabel = {
  [GenderEnum.FEMALE]: "Female",
  [GenderEnum.MALE]: "Male",
  [GenderEnum.OTHER]: "Other",
};

export const genreLabel = {
  [GenreEnum.RNB]: "RNB",
  [GenreEnum.ROCK]: "Rock",
  [GenreEnum.JAZZ]: "Jazz",
  [GenreEnum.CLASSIC]: "Classic",
  [GenreEnum.COUNTRY]: "Country",
};
