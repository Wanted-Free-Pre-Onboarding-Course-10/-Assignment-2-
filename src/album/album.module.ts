import { Module } from '@nestjs/common';
import { AlbumQueryResolver } from './album.query.resolver';
import { AlbumQueryService } from './album.query.service';

@Module({
  providers: [AlbumQueryResolver, AlbumQueryService],
})
export class AlbumModule {}
