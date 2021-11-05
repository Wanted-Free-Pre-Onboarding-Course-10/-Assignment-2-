import { Module } from "@nestjs/common";
import { MusicianQueryService } from "./musician.query.service";
import { MusicianQueryResolver } from "./musician.query.resolver";
import { MusicianController } from "./musician.controller";
import { MusicianService } from "./musician.service";

@Module({
  controllers: [MusicianController],
  providers: [MusicianService, MusicianQueryService, MusicianQueryResolver],
})
export class MusicianModule {}
