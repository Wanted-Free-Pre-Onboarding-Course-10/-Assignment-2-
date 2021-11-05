import { Args, Query, Resolver } from "@nestjs/graphql";
import { Song } from "./graph.song.entity";
import { SongQueryService } from "./song.query.service";
import { Album } from "../album/graph.album.entity";

@Resolver()
export class SongResolver {
  constructor(private songQueryService: SongQueryService) {}

  @Query(() => [Song])
  async getAllSong(): Promise<Song[]> {
    return await this.songQueryService.getAllSong();
  }

  @Query(() => [Album])
  async getAlbumBySong(
    @Args("songId", { type: () => String }) songId: string
  ): Promise<Album[]> {
    return await this.songQueryService.getAlbumBySong(songId);
  }
}
