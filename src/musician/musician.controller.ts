import {
  Body,
  Controller,
  Delete,
  Logger,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ResponseMusicianDto } from "./dto/res.musician.dto";
import { MusicianService } from "./musician.service";
import { CreateMusicianDto } from "./dto/create.musician.dto";
import { UpdateMusicianDto } from "./dto/update.musician.dto";
import { ConnectionDto } from "../song/dto/connection.dto";

@Controller("musician")
// @UseFilters(new HttpExceptionFil)
export class MusicianController {
  private logger = new Logger("MusicianController");

  constructor(private musicianService: MusicianService) {}

  @Post()
  async createMusician(
    @Body() createMusicianDto: CreateMusicianDto
  ): Promise<ResponseMusicianDto> {
    return await this.musicianService.createMusician(createMusicianDto);
  }

  @Patch("/:id")
  async updateMusicianById(
    @Param("id") id: string,
    @Body() updateMusicianDto: UpdateMusicianDto
  ): Promise<ResponseMusicianDto> {
    this.logger.debug(
      `updateMusician controller dto : ${JSON.stringify(updateMusicianDto)}`
    );
    return await this.musicianService.updateMusicianById(id, updateMusicianDto);
  }

  @Delete("/:id")
  async deleteMusician(@Param("id") id: string): Promise<string> {
    return await this.musicianService.deleteMusician(id);
  }

  @Post("/connect/song")
  async connectToAlbum(@Body() connectionDto: ConnectionDto) {
    return await this.musicianService.connect(connectionDto, "Song", "SING");
  }

  @Post("/disconnect/song")
  async disconnectToAlbum(@Body() connectionDto: ConnectionDto) {
    return await this.musicianService.disconnect(connectionDto, "Song", "SING");
  }
}
