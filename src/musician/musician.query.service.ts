import { Injectable } from "@nestjs/common";
import { Neo4jService } from "../neo4j/neo4j.service";
import { Musician } from "./graph.musician.entity";
import { MUSICIAN_TO_SONG, SONG_TO_ALBUM } from "../relation/relation";
import { Album } from "../album/graph.album.entity";
import { Song } from "../song/graph.song.entity";

@Injectable()
export class MusicianQueryService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async getAllMusician() {
    const result = await this.neo4jService.read(
      `MATCH
                (musician : Musician) 
              RETURN musician`,
      {}
    );

    return result.records.map((album) => {
      const id = album.get("musician").properties.id;
      const name = album.get("musician").properties.name;
      const res: Musician = {
        id,
        name,
      };
      return res;
    });
  }

  async getAlbumByMusician(id: string) {
    const result = await this.neo4jService.read(
      `MATCH
                (musician:Musician {id: "${id}"})-[:${MUSICIAN_TO_SONG}]-(song),
                (song)-[:${SONG_TO_ALBUM}]-(album)
              RETURN album`,
      {}
    );

    return result.records.map((album) => {
      const res: Album = {
        id: album.get("album").properties.id,
        name: album.get("album").properties.name,
      };
      return res;
    });
  }

  async getSongsByMusician(id: string) {
    const result = await this.neo4jService.read(
      `MATCH
                (musician:Musician {id: "${id}"})-[:${MUSICIAN_TO_SONG}]-(song)
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
