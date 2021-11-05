import { Module } from "@nestjs/common";
import { AlbumController } from "./album.controller";
import { AlbumQueryResolver } from "./album.query.resolver";
import { AlbumResolver } from "./album.resolver";
import { AlbumQueryService } from "./album.query.service";
import { AlbumService } from "./album.service";

@Module({
  controllers: [AlbumController],
  providers: [AlbumQueryResolver, AlbumQueryService, AlbumService],
})
export class AlbumModule {}
