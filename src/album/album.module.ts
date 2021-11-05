import { Module } from "@nestjs/common";
import { AlbumResolver } from "./album.resolver";
import { AlbumQueryService } from "./album.query.service";

@Module({
  providers: [AlbumResolver, AlbumQueryService],
})
export class AlbumModule {}
