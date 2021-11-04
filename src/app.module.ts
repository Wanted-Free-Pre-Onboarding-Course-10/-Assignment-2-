import { Module } from '@nestjs/common';
import { MusicianModule } from './musician/musician.module';
import { SongModule } from './song/song.module';
import { AlbumModule } from './album/album.module';
import { Neo4jModule } from './neo4j/neo4j.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gpl'
    }),
    MusicianModule, 
    SongModule, 
    AlbumModule, 
    Neo4jModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
