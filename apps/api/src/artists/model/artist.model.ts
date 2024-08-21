import { GenderEnum } from "@server/common/types/types";

class ArtistModel {
  id: number;
  name: string;
  dob: Date;
  gender: GenderEnum;
  address: string;
  first_release_year: number;
  no_of_albums_released: number;
}

export default ArtistModel;
