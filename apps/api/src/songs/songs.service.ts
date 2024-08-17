import { HttpException, Injectable } from "@nestjs/common";
import SongsRepository from "./repository/songs.repository";
import SongDto from "./dto/song.dto";

@Injectable()
class SongsService {
  constructor(private readonly songsRepository: SongsRepository) {}

  async getSongsByArtistId(artistId: number, page: number, limit: number) {
    try {
      return await this.songsRepository.getSongsByArtistId(
        artistId,
        page,
        limit,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getSongById(id: number) {
    try {
      return await this.songsRepository.getSongById(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async createSong(songData: SongDto, artistId: number) {
    try {
      return await this.songsRepository.create(songData, artistId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async updateSong(id: number, songData: SongDto) {
    try {
      return await this.songsRepository.update(id, songData);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async deleteSong(id: number) {
    try {
      return await this.songsRepository.delete(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}

export default SongsService;
