import { Module } from "@nestjs/common";
import { MusicianQueryService } from "./musician.query.service";
import { MusicianController } from "./musician.controller";
import { MusicianService } from "./musician.service";
import { MusicianResolver } from "./musician.resolver";

@Module({
  controllers: [MusicianController],
  providers: [MusicianService, MusicianQueryService, MusicianResolver],
})
export class MusicianModule {}
