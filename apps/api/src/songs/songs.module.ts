import { Module } from "@nestjs/common";
import SongsController from "./songs.controller";
import SongsService from "./songs.service";
import SongsRepository from "./repository/songs.repository";
import { ArtistModule } from "@server/artists/artists.module";

@Module({
  imports: [ArtistModule],
  controllers: [SongsController],
  providers: [SongsService, SongsRepository],
  exports: [SongsService],
})
export class SongsModule {}
