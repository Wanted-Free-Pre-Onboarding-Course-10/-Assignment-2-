import { Module } from "@nestjs/common";
import { AlbumController } from "./album.controller";
import { AlbumResolver } from "./album.resolver";
import { AlbumQueryService } from "./album.query.service";
import { AlbumService } from "./album.service";

@Module({
  controllers: [AlbumController],
  providers: [AlbumQueryService, AlbumService],
})
export class AlbumModule {}
