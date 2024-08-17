import { HttpException, Injectable } from "@nestjs/common";
import ArtistRepository from "./repository/artist.repository";
import ArtistDto from "./dto/artist.dto";

@Injectable()
class ArtistService {
  constructor(private readonly artistsRepository: ArtistRepository) {}

  async getAllArtist(page: number, limit: number) {
    try {
      return await this.artistsRepository.getAllArtists(page, limit);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getArtistById(id: number) {
    try {
      return await this.artistsRepository.getArtistsById(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async createArtist(artistData: ArtistDto) {
    try {
      return await this.artistsRepository.create(artistData);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async updateArtist(id: number, artistData: ArtistDto) {
    try {
      return await this.artistsRepository.update(id, artistData);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async deleteArtist(id: number) {
    try {
      return await this.artistsRepository.delete(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}

export default ArtistService;
