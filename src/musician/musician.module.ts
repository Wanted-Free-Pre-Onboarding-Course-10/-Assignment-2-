import { Module } from '@nestjs/common';
import { MusicianController } from './musician.controller';
import { MusicianQueryService } from './musician.query.service';
import { MusicianQueryResolver } from './musician.query.resolver';

@Module({
  controllers: [MusicianController],
  providers: [MusicianQueryService, MusicianQueryResolver],
})
export class MusicianModule {}
