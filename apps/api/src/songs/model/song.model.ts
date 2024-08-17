import { GenreEnum } from "../types/types";

class SongModel {
  id: number;
  tilte: string;
  album_name: string;
  genre: GenreEnum;
}

export default SongModel;
