import { Injectable } from "@nestjs/common";
import { Neo4jService } from "../neo4j/neo4j.service";
import { Musician } from "./graph.musician.entity";
import { MUSICIAN_TO_SONG, SONG_TO_ALBUM } from "../relation/relation";
import { Album } from "../album/graph.album.entity";

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
      const musicianId = album.get("musician").properties.musicianId;
      const name = album.get("musician").properties.name;
      const res: Musician = {
        musicianId,
        name,
      };
      return res;
    });
  }

  async getAlbumByMusician(musicianId: string) {
    const result = await this.neo4jService.read(
      `MATCH
                (musician:Musician {musicianId: "${musicianId}"})-[:${MUSICIAN_TO_SONG}]-(song),
                (song)-[:${SONG_TO_ALBUM}]-(album)
              RETURN album`,
      {}
    );

    return result.records.map((album) => {
      const res: Album = {
        albumId: album.get("album").properties.albumId,
        name: album.get("album").properties.name,
      };
      return res;
    });
  }
}
