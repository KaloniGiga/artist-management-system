import { Module } from "@nestjs/common";
import ArtistController from "./artists.controller";
import ArtistService from "./artists.service";
import ArtistRepository from "./repository/artist.repository";

@Module({
  imports: [],
  controllers: [ArtistController],
  providers: [ArtistService, ArtistRepository],
  exports: [ArtistService],
})
export class ArtistModule {}
