import { Module } from '@nestjs/common';
import { Neo4jModule } from 'src/neo4j/neo4j.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService]
})
export class AlbumModule {}
