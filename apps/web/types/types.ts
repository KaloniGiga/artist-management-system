export interface User {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  dob?: Date;
  gender?: GenderEnum;
  role_type?: RoleEnum;
  address?: string;
}

export interface UserData extends User {
  id: number;
}

// "This will allow you to update the state within the context whenever you need to."
export interface UserContextProps {
  user: User | null;
  updateUser: (property: Partial<User>) => void;
}

export enum GenderEnum {
  MALE = "m",
  FEMALE = "f",
  OTHER = "o",
}

export enum RoleEnum {
  SUPERADMIN = "super_admin",
  ARTISTMANAGER = "artist_manager",
  ARTIST = "artist",
}
