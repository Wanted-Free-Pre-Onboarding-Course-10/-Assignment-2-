import { Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { SongResolver } from './song.resolver';

@Module({
  controllers: [SongController],
  providers: [SongService, SongResolver]
})
export class SongModule {}
