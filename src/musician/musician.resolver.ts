import { Args, Query, Resolver } from "@nestjs/graphql";
import { MusicianQueryService } from "./musician.query.service";
import { Musician } from "./graph.musician.entity";
import { Album } from "../album/graph.album.entity";
import { Song } from "../song/graph.song.entity";

@Resolver()
export class MusicianResolver {
  constructor(private musicianQueryService: MusicianQueryService) {}

  @Query(() => [Musician])
  async getAllMusician(): Promise<Musician[]> {
    return await this.musicianQueryService.getAllMusician();
  }

  @Query(() => [Album])
  async getAlbumByMusician(
    @Args("id", { type: () => String }) id: string
  ): Promise<Album[]> {
    return await this.musicianQueryService.getAlbumByMusician(id);
  }

  @Query(() => [Song])
  async getSongsByMusician(
    @Args("id", { type: () => String }) id: string
  ): Promise<Song[]> {
    return await this.musicianQueryService.getSongsByMusician(id);
  }
}
