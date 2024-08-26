import { Expose } from "class-transformer";
import { GenreEnum } from "../types/types";

class SongModel {
  id: number;
  tilte: string;
  album_name: string;
  genre: GenreEnum;
  @Expose({ name: "artist_id" })
  artistId: number;
}

export default SongModel;
