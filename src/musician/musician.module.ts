import { Module } from '@nestjs/common';
import { MusicianController } from './musician.controller';
import { MusicianService } from './musician.service';
import { MusicianResolver } from './musician.resolver';

@Module({
  controllers: [MusicianController],
  providers: [MusicianService, MusicianResolver],
})
export class MusicianModule {}
