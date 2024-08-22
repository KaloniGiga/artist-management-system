import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import ArtistService from "./artists.service";
import ArtistDto from "./dto/artist.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller({ version: "1", path: "artists" })
@ApiTags("Artists")
class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getAllArtist(
    @Query("page", ParseIntPipe) page: number,
    @Query("limit", ParseIntPipe) limit: number,
  ) {
    return await this.artistService.getAllArtist(page, limit);
  }

  @Get(":id")
  async getArtistById(@Param("id", ParseIntPipe) id: number) {
    return await this.artistService.getArtistById(id);
  }

  @Post()
  async createArtist(@Body() artistData: ArtistDto) {
    return await this.artistService.createArtist(artistData);
  }

  @Put(":id")
  async updateArtist(
    @Param("id", ParseIntPipe) id: number,
    @Body() artistData: ArtistDto,
  ) {
    return await this.artistService.updateArtist(id, artistData);
  }

  @Delete(":id")
  async deleteArtist(@Param("id", ParseIntPipe) id: number) {
    return await this.artistService.deleteArtist(id);
  }
}

export default ArtistController;
