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
import { ApiTags } from "@nestjs/swagger";
import SongsService from "./songs.service";
import SongDto from "./dto/song.dto";

@Controller({ version: "1", path: "song" })
@ApiTags("Songs")
class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  async getAllSong(
    @Query("page", ParseIntPipe) page: number,
    @Query("limit", ParseIntPipe) limit: number,
  ) {
    return await this.songsService.getAllSongs(page, limit);
  }

  @Get(":id")
  async getSongBYId(@Param("id", ParseIntPipe) id: number) {
    return await this.songsService.getSongById(id);
  }

  @Post()
  async createSong(@Body() songData: SongDto) {
    return await this.songsService.createSong(songData);
  }

  @Put(":id")
  async updateSong(
    @Param("id", ParseIntPipe) id: number,
    @Body() songData: SongDto,
  ) {
    return await this.songsService.updateSong(id, songData);
  }

  @Delete(":id")
  async deleteSong(@Param("id", ParseIntPipe) id: number) {
    return await this.songsService.deleteSong(id);
  }
}

export default SongsController;
