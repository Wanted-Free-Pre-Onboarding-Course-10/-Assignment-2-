import { Args, Query, Resolver } from "@nestjs/graphql";
import { Album } from "./graph.album.entity";
import { AlbumQueryService } from "./album.query.service";
import { Musician } from "../musician/graph.musician.entity";
import { Song } from "../song/graph.song.entity";

@Resolver()
export class AlbumResolver {
  constructor(private albumService: AlbumQueryService) {}

  @Query(() => [Album])
  async getAllAlbum(): Promise<Album[]> {
    return await this.albumService.getAllAlbum();
  }

  @Query(() => [Musician])
  async getMusicianByAlbum(
    @Args("albumId", { type: () => String }) albumId: string
  ): Promise<Musician[]> {
    return await this.albumService.getMusicianByAlbum(albumId);
  }

  @Query(() => [Song])
  async getSongByAlbum(
    @Args("albumId", { type: () => String }) albumId: string
  ): Promise<Song[]> {
    return await this.albumService.getSongByAlbum(albumId);
  }
}
