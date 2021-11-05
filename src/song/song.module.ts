import { Module } from "@nestjs/common";
import { SongController } from "./song.controller";
import { SongService } from "./song.service";
import { SongResolver } from "./song.resolver";
import { SongQueryService } from "./song.query.service";

@Module({
  controllers: [SongController],
  providers: [SongService, SongResolver, SongQueryService],
})
export class SongModule {}
