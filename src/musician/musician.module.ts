import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { MusicianController } from './musician.controller';
import { MusicianResolver } from './musician.resolver';
import { MusicianService } from './musician.service';
=======
import { Neo4jModule } from 'src/neo4j/neo4j.module';
import { MusicianController } from './musician.controller';
import { MusicianService } from './musician.service';
import { MusicianResolver } from './musician.resolver';
>>>>>>> c86b86f (Feat: Add album service)

@Module({
  controllers: [MusicianController],
  providers: [MusicianService, MusicianResolver]
})
export class MusicianModule {}
