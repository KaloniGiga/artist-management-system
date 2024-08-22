export interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  dob: Date;
  gender: GenderEnum;
  role_type: RoleEnum;
  address: string;
}

export interface UserData extends User {
  id: number;
}

export interface Artist {
  name: string;
  dob: Date;
  gender: GenderEnum;
  address: string;
  first_release_year: number;
  no_of_albums_released: number;
}

export interface ArtistData extends Artist {
  id: number;
}

export interface Song {
  title: string;
  album_name: string;
  genre: GenreEnum;
  authorId?: number;
}

export interface SongData extends Song {
  id: number;
}

export interface LoginData {
  email: string;
  password: string;
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

export enum GenreEnum {
  RNB = "rnb",
  ROCK = "rock",
  CLASSIC = "classic",
  COUNTRY = "country",
  JAZZ = "jazz",
}

interface SuccessResponse {
  status: boolean;
  path: string;
  message: string;
  statusCode: number;
  timestamp: Date;
}

export interface AuthenticateResponse extends SuccessResponse {
  data: Omit<UserData, "password">;
}

export interface LogoutResponse extends SuccessResponse {
  data: null;
}

export interface UserQueryResponse extends SuccessResponse {
  data: UserData[];
}

export interface UserMutationResponse extends SuccessResponse {
  data: UserData;
}

export interface ArtistQueryResponse extends SuccessResponse {
  data: ArtistData[];
}

export interface ArtistMutationResponse extends SuccessResponse {
  data: ArtistData;
}
