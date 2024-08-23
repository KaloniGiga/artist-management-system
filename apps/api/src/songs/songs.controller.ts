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
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import SongsService from "./songs.service";
import SongDto from "./dto/song.dto";
import JwtAuthenticationGuard from "@server/auth/guards/jwt.guard";
import { RequestWithUser } from "@server/auth/types/types";
import { RoleEnum } from "@server/users/types/types";
import { Roles } from "@server/common/decorators/roles.decorator";
import { RoleGuard } from "@server/auth/guards/role.guard";
import { ResponseMessage } from "@server/common/decorators/response-message.decorator";

@Controller({ version: "1", path: "songs" })
@ApiTags("Songs")
class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard, RoleGuard)
  @Roles(RoleEnum.ARTISTMANAGER)
  @ApiOperation({
    summary: "Get songs",
    description: "Get songs of artist with pagination",
  })
  @ResponseMessage("Songs fetched successfully")
  async getSongsByArtistId(
    @Query("artistId", ParseIntPipe) artistId: number,
    @Query("page", ParseIntPipe) page: number,
    @Query("limit", ParseIntPipe) limit: number,
  ) {
    return await this.songsService.getSongsByArtistId(artistId, page, limit);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard, RoleGuard)
  @ApiOperation({
    summary: "Create Song",
    description: "Create Song for a artist",
  })
  @ResponseMessage("Song created successfully")
  @Roles(RoleEnum.ARTIST)
  async createSong(@Req() request: RequestWithUser, @Body() songData: SongDto) {
    const artistId =
      request.user.role == RoleEnum.ARTIST
        ? request.user.id
        : songData.artistId;
    return await this.songsService.createSong(songData, artistId);
  }

  @Put(":id")
  @UseGuards(JwtAuthenticationGuard, RoleGuard)
  @Roles(RoleEnum.ARTIST)
  @ApiOperation({
    summary: "Update song",
    description: "Update a song having given id",
  })
  @ResponseMessage("Song updated successfully")
  async updateSong(
    @Param("id", ParseIntPipe) id: number,
    @Body() songData: SongDto,
  ) {
    return await this.songsService.updateSong(id, songData);
  }

  @Delete(":id")
  @UseGuards(JwtAuthenticationGuard, RoleGuard)
  @Roles(RoleEnum.ARTIST)
  @ApiOperation({
    summary: "Delete song",
    description: "Delete a song having given id",
  })
  @ResponseMessage("Song deleted successfully")
  async deleteSong(@Param("id", ParseIntPipe) id: number) {
    return await this.songsService.deleteSong(id);
  }
}

export default SongsController;
