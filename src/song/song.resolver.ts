import { Args, Query, Resolver } from "@nestjs/graphql";
import { Song } from "./graph.song.entity";
import { SongQueryService } from "./song.query.service";
import { Album } from "../album/graph.album.entity";
import { Musician } from "../musician/graph.musician.entity";

@Resolver()
export class SongResolver {
  constructor(private songQueryService: SongQueryService) {}

  @Query(() => [Song])
  async getAllSong(): Promise<Song[]> {
    return await this.songQueryService.getAllSong();
  }

  @Query(() => [Album])
  async getAlbumBySong(
    @Args("id", { type: () => String }) id: string
  ): Promise<Album[]> {
    return await this.songQueryService.getAlbumBySong(id);
  }

  @Query(() => [Musician])
  async getMusicianBySong(
    @Args("id", { type: () => String }) id: string
  ): Promise<Musician[]> {
    return await this.songQueryService.getMusicianBySong(id);
  }
}
