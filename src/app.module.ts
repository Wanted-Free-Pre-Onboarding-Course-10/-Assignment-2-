import { Module } from "@nestjs/common";
import { MusicianModule } from "./musician/musician.module";
import { SongModule } from "./song/song.module";
import { AlbumModule } from "./album/album.module";
import { Neo4jModule } from "./neo4j/neo4j.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env.prod",
    }),
    Neo4jModule.forRootAsync({
      useFactory: async () => ({
        scheme: process.env.DB_SCHEME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
      }),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.gpl",
    }),
    MusicianModule,
    SongModule,
    AlbumModule,
  ],
})
export class AppModule {}
