import { Args, Query, Resolver } from '@nestjs/graphql';
import { Album } from './album.entity';
import { AlbumService } from './album.service';
import { Musician } from '../musician/musician.entity';
import { Song } from '../song/song.entity';

@Resolver()
export class AlbumResolver {
  constructor(private albumService: AlbumService) {}

  @Query(() => [Album])
  async getAllAlbum(): Promise<Album[]> {
    return await this.albumService.getAllAlbum();
  }

  @Query(() => [Musician])
  async getMusicianByAlbum(
    @Args('albumId', { type: () => String }) albumId: string,
  ): Promise<Musician[]> {
    return await this.albumService.getMusicianByAlbum(albumId);
  }

  @Query(() => [Song])
  async getSongByAlbum(
    @Args('albumId', { type: () => String }) albumId: string,
  ): Promise<Song[]> {
    return await this.albumService.getSongByAlbum(albumId);
  }
}
