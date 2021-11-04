import { Module } from '@nestjs/common';
import { Neo4jModule } from 'src/neo4j/neo4j.module';
import { MusicianController } from './musician.controller';
import { MusicianService } from './musician.service';
import { MusicianResolver } from './musician.resolver';

@Module({
  imports: [
    Neo4jModule.forRoot({
      scheme: 'neo4j+s',
      host: 'e0f0bfda.databases.neo4j.io',
      port: 7687,
      username: 'neo4j',
      password: 'f83YWstyvP9iBxvbtZZpPZh_j7mpq3PXZTFrjntIfaU'
    })
  ],
  controllers: [MusicianController],
  providers: [MusicianService, MusicianResolver]
})
export class MusicianModule {}
