/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import DatabaseService from "@server/database/database.service";
import ArtistDto from "../dto/artist.dto";

@Injectable()
class ArtistRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllArtists(page: number, limit: number) {}

  async getArtistsById(id: number) {}

  async create(artistData: ArtistDto) {}

  async update(id: number, artistData: ArtistDto) {}

  async delete(id: number) {}
}

export default ArtistRepository;
