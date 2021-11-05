import { Injectable } from "@nestjs/common";
import { Neo4jService } from "../neo4j/neo4j.service";
import { Album } from "./graph.album.entity";
import { Musician } from "../musician/graph.musician.entity";
import { Song } from "../song/graph.song.entity";
import { ALBUM_TO_SONG, SONG_TO_MUSICIAN } from "../relation/relation";

@Injectable()
export class AlbumQueryService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async getAllAlbum(): Promise<Album[]> {
    const result = await this.neo4jService.read(
      `MATCH
                (album : Album) 
              RETURN album`,
      {}
    );

    return result.records.map((album) => {
      const id = album.get("album").properties.id;
      const name = album.get("album").properties.name;
      const res: Album = {
        id,
        name,
      };
      return res;
    });
  }

  async getMusicianByAlbum(id: string): Promise<Musician[]> {
    const result = await this.neo4jService.read(
      `MATCH
                (album:Album {id: "${id}"})-[:${ALBUM_TO_SONG}]-(song),
                (song)-[:${SONG_TO_MUSICIAN}]-(musician)
              RETURN musician`,
      {}
    );

    return result.records.map((musician) => {
      const res: Musician = {
        id: musician.get("musician").properties.id,
        name: musician.get("musician").properties.name,
      };
      return res;
    });
  }

  async getSongByAlbum(id: string) {
    const result = await this.neo4jService.read(
      `MATCH
                (album:Album {id: "${id}"})-[:${ALBUM_TO_SONG}]-(song)
             RETURN song
            `,
      {}
    );

    return result.records.map((song) => {
      const res: Song = {
        id: song.get("song").properties.id,
        name: song.get("song").properties.name,
      };
      return res;
    });
  }
}
