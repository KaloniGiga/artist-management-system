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
  UseGuards,
} from "@nestjs/common";
import ArtistService from "./artists.service";
import ArtistDto from "./dto/artist.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles } from "@server/common/decorators/roles.decorator";
import JwtAuthenticationGuard from "@server/auth/guards/jwt.guard";
import { RoleGuard } from "@server/auth/guards/role.guard";
import { RoleEnum } from "@server/users/types/types";
import { ResponseMessage } from "@server/common/decorators/response-message.decorator";

@Controller({ version: "1", path: "artists" })
@ApiTags("Artists")
class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard, RoleGuard)
  @Roles(RoleEnum.ARTISTMANAGER)
  @ApiOperation({
    summary: "Get artists",
    description: "Get artists with pagination",
  })
  @ResponseMessage("Artists fetched successfully")
  async getAllArtist(
    @Query("page", ParseIntPipe) page: number,
    @Query("limit", ParseIntPipe) limit: number,
  ) {
    return await this.artistService.getAllArtist(page, limit);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard, RoleGuard)
  @Roles(RoleEnum.ARTISTMANAGER)
  @ApiOperation({
    summary: "Create artist",
    description: "Create artist",
  })
  @ResponseMessage("Artist created successfully")
  async createArtist(@Body() artistData: ArtistDto) {
    return await this.artistService.createArtist(artistData);
  }

  @Put(":id")
  @UseGuards(JwtAuthenticationGuard, RoleGuard)
  @Roles(RoleEnum.ARTISTMANAGER)
  @ApiOperation({
    summary: "Update artist",
    description: "Update artist having specified id",
  })
  @ResponseMessage("Artist updated successfully")
  async updateArtist(
    @Param("id", ParseIntPipe) id: number,
    @Body() artistData: ArtistDto,
  ) {
    return await this.artistService.updateArtist(id, artistData);
  }

  @Delete(":id")
  @UseGuards(JwtAuthenticationGuard, RoleGuard)
  @Roles(RoleEnum.ARTISTMANAGER)
  @ApiOperation({
    summary: "Delete artist",
    description: "Delete artist having specified id",
  })
  @ResponseMessage("Artist deleted successfully")
  async deleteArtist(@Param("id", ParseIntPipe) id: number) {
    return await this.artistService.deleteArtist(id);
  }
}

export default ArtistController;
