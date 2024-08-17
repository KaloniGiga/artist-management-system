/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from "@nestjs/common";
import DatabaseService from "@server/database/database.service";
import { plainToInstance } from "class-transformer";
import SongModel from "../model/song.model";
import SongDto from "../dto/song.dto";

@Injectable()
class SongsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllSongs(page: number, limit: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `SELECT * FROM songs LIMIT $1 OFFSET $2`,
      [limit, limit * page],
    );

    return plainToInstance(SongModel, databaseResponse.rows);
  }

  async getSongById(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `SELECT * FROM songs WHERE id=$1`,
      [id],
    );
    const entity = databaseResponse.rows[0];
    if (!entity) {
      throw new NotFoundException();
    }
    return plainToInstance(SongModel, entity);
  }

  async create(songData: SongDto) {
    const databaseResponse = await this.databaseService.runQuery(
      `INSERT INTO songs (title, album_name, genre) VALUES ($1, $2, $3) RETURNING *`,
      [songData.title, songData.album_name, songData.genre],
    );

    return plainToInstance(SongDto, databaseResponse.rows[0]);
  }

  async update(id: number, songData: SongDto) {
    const databaseResponse = await this.databaseService.runQuery(
      `
          UPDATE songs SET title = $2, album_name = $3, genre = $4 WHERE id = $1 RETURNING * 
        `,
      [id, songData.title, songData.album_name, songData.genre],
    );

    const entity = databaseResponse.rows[0];
    if (entity) {
      return new NotFoundException();
    }

    return plainToInstance(SongModel, entity);
  }

  async delete(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `
        DELETE FROM songs WHERE id=$1`,
      [id],
    );
    if (databaseResponse.rowCount == 0) {
      return new NotFoundException();
    }
  }
}

export default SongsRepository;
