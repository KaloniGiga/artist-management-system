import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import SongsRepository from "./repository/songs.repository";
import SongDto from "./dto/song.dto";
import ArtistService from "@server/artists/artists.service";

@Injectable()
class SongsService {
  constructor(
    private readonly songsRepository: SongsRepository,
    private readonly artistService: ArtistService,
  ) {}

  async getSongsByArtistId(
    artistId: number,
    page: number = 0,
    limit: number = 10,
  ) {
    try {
      const songs = await this.songsRepository.getSongsByArtistId(
        artistId,
        page,
        limit,
      );
      const totalRows = await this.songsRepository.getTotalRows(artistId);
      return { totalRows, songs };
    } catch (error) {
      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSongById(id: number) {
    return await this.songsRepository.getSongById(id);
  }

  async createSong(songData: SongDto, artistId: number) {
    try {
      // check if artistId is valid.
      const targetArtist = await this.artistService.getArtistById(artistId);
      if (!targetArtist) {
        throw new NotFoundException("Invalid Artist");
      }
      // check if the tilte is uniques\
      return await this.songsRepository.create(songData, artistId);
    } catch (error) {
      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateSong(id: number, songData: SongDto) {
    try {
      // check if aritstId is valid
      const targetArtist = await this.artistService.getArtistById(
        songData.artistId,
      );
      if (!targetArtist) {
        throw new NotFoundException("Invalid Artist");
      }

      // check if title is unique.
      return await this.songsRepository.update(id, songData);
    } catch (error) {
      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteSong(id: number) {
    try {
      return await this.songsRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export default SongsService;
