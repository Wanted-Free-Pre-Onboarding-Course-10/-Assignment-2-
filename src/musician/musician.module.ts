import { Module } from '@nestjs/common';
import { MusicianController } from './musician.controller';
import { MusicianResolver } from './musician.resolver';
import { MusicianService } from './musician.service';

@Module({
  controllers: [MusicianController],
  providers: [MusicianService, MusicianResolver]
})
export class MusicianModule {}
