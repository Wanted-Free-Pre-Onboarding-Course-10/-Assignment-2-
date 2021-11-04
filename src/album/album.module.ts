import { Module } from '@nestjs/common';
import { AlbumResolver } from './album.resolver';

@Module({
  providers: [AlbumResolver]
})
export class AlbumModule {}
