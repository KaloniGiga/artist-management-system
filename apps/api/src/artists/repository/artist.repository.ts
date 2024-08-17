/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from "@nestjs/common";
import DatabaseService from "@server/database/database.service";
import ArtistDto from "../dto/artist.dto";
import { plainToInstance } from "class-transformer";
import ArtistModel from "../model/artist.model";

@Injectable()
class ArtistRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllArtists(page: number, limit: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `SELECT * FROM artists LIMIT $1 OFFSET $2`,
      [limit, limit * page],
    );

    return plainToInstance(ArtistModel, databaseResponse.rows);
  }

  async getArtistsById(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `SELECT * FROM artists WHERE id=$1`,
      [id],
    );
    const entity = databaseResponse.rows[0];
    if (!entity) {
      throw new NotFoundException();
    }
    return plainToInstance(ArtistModel, entity);
  }

  async create(artistData: ArtistDto) {
    const databaseResponse = await this.databaseService.runQuery(
      `INSERT INTO artists (name, dob, gender, address, first_release_data, no_of_albums_released) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        artistData.name,
        artistData.dob,
        artistData.gender,
        artistData.address,
        artistData.first_release_year,
        artistData.no_of_albums_released,
      ],
    );

    return plainToInstance(ArtistModel, databaseResponse.rows[0]);
  }

  async update(id: number, artistData: ArtistDto) {
    const databaseResponse = await this.databaseService.runQuery(
      `
          UPDATE artists SET name = $2, dob = $3, gender = $4, address = $5, first_release_year = $6, no_of_albums_released = $7 WHERE id = $1 RETURNING * 
        `,
      [
        id,
        artistData.name,
        artistData.dob,
        artistData.gender,
        artistData.address,
        artistData.first_release_year,
        artistData.no_of_albums_released,
      ],
    );

    const entity = databaseResponse.rows[0];
    if (entity) {
      return new NotFoundException();
    }

    return plainToInstance(ArtistModel, entity);
  }

  async delete(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `
        DELETE FROM artists WHERE id=$1`,
      [id],
    );
    if (databaseResponse.rowCount == 0) {
      return new NotFoundException();
    }
  }
}

export default ArtistRepository;
