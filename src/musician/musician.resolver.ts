import { Args, Query, Resolver } from "@nestjs/graphql";
import { MusicianQueryService } from "./musician.query.service";
import { Musician } from "./graph.musician.entity";
import { Album } from "../album/graph.album.entity";

@Resolver()
export class MusicianResolver {
  constructor(private musicianQueryService: MusicianQueryService) {}

  @Query(() => [Musician])
  async getAllMusician(): Promise<Musician[]> {
    return await this.musicianQueryService.getAllMusician();
  }

  @Query(() => [Album])
  async getAlbumByMusician(
    @Args("musicianId", { type: () => String }) musicianId: string
  ): Promise<Album[]> {
    return await this.musicianQueryService.getAlbumByMusician(musicianId);
  }
}
