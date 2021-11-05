import { Query, Resolver } from '@nestjs/graphql';
import { Album } from './album.entity';
import { AlbumService } from './album.service';

@Resolver()
export class AlbumResolver {
  constructor(private albumService: AlbumService) {}

  @Query(() => [Album])
  async getAllAlbum(): Promise<Album[]> {
    return await this.albumService.getAllAlbum();
  }
}
