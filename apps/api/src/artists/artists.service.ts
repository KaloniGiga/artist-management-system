import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import ArtistRepository from "./repository/artist.repository";
import ArtistDto from "./dto/artist.dto";

@Injectable()
class ArtistService {
  constructor(private readonly artistsRepository: ArtistRepository) {}

  async getAllArtist(page: number, limit: number) {
    try {
      const artists = await this.artistsRepository.getAllArtists(page, limit);
      const totalRows = await this.artistsRepository.getTotalRows();
      return { totalRows, artists };
    } catch (error) {
      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getArtistById(id: number) {
    return await this.artistsRepository.getArtistsById(id);
  }

  async createArtist(artistData: ArtistDto) {
    try {
      const isNameExist = await this.artistsRepository.getArtistByName(
        artistData.name,
      );
      if (isNameExist) {
        throw new HttpException(
          "Artist name already exits.",
          HttpStatus.CONFLICT,
        );
      }
      return await this.artistsRepository.create(artistData);
    } catch (error) {
      if (error.status == HttpStatus.CONFLICT) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        "Something went wrong.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateArtist(id: number, artistData: ArtistDto) {
    try {
      const targetArtist = await this.getArtistById(id);
      if (!targetArtist) {
        throw new NotFoundException();
      }
      if (targetArtist.name !== artistData.name) {
        const isNameExist = await this.artistsRepository.getArtistByName(
          artistData.name,
        );

        if (isNameExist) {
          throw new HttpException(
            "Artist name already exits.",
            HttpStatus.CONFLICT,
          );
        }
      }
      return await this.artistsRepository.update(id, artistData);
    } catch (error) {
      if (error.status == HttpStatus.CONFLICT) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        "Something went wrong.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteArtist(id: number) {
    try {
      return await this.artistsRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        "Something went wrong.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export default ArtistService;
