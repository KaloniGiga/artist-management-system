import { Module } from "@nestjs/common";
import SongsController from "./songs.controller";
import SongsService from "./songs.service";
import SongsRepository from "./repository/songs.repository";

@Module({
  imports: [],
  controllers: [SongsController],
  providers: [SongsService, SongsRepository],
  exports: [SongsService],
})
export class ArtistModule {}
