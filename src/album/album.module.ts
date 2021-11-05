import { Module } from '@nestjs/common';
<<<<<<< HEAD

@Module({})
=======
import { Neo4jModule } from 'src/neo4j/neo4j.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService]
})
>>>>>>> c86b86f (Feat: Add album service)
export class AlbumModule {}
