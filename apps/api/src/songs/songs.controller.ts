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
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import SongsService from "./songs.service";
import SongDto from "./dto/song.dto";
import JwtAuthenticationGuard from "@server/auth/guards/jwt.guard";
import { RequestWithUser } from "@server/auth/types/types";
import { RoleEnum } from "@server/users/types/types";

@Controller({ version: "1", path: "songs" })
@ApiTags("Songs")
class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  async getSongsByArtistId(
    @Query("artistId", ParseIntPipe) artistId: number,
    @Query("page", ParseIntPipe) page: number,
    @Query("limit", ParseIntPipe) limit: number,
  ) {
    return await this.songsService.getSongsByArtistId(artistId, page, limit);
  }

  @Get(":id")
  async getSongBYId(@Param("id", ParseIntPipe) id: number) {
    return await this.songsService.getSongById(id);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createSong(@Req() request: RequestWithUser, @Body() songData: SongDto) {
    const authorId =
      request.user.role == RoleEnum.ARTIST
        ? request.user.id
        : songData.authorId;
    return await this.songsService.createSong(songData, authorId);
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
