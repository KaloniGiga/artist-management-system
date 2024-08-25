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

  async getSongsByArtistId(artistId: number, page: number, limit: number) {
    try {
      return await this.songsRepository.getSongsByArtistId(
        artistId,
        page,
        limit,
      );
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
        throw new NotFoundException();
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
        throw new NotFoundException();
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
