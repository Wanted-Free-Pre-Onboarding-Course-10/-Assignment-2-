import { Injectable } from "@nestjs/common";
import { Neo4jService } from "../neo4j/neo4j.service";
import { Song } from "../song/graph.song.entity";
import { SONG_TO_ALBUM, SONG_TO_MUSICIAN } from "../relation/relation";
import { Album } from "../album/graph.album.entity";
import { Musician } from "../musician/graph.musician.entity";

@Injectable()
export class SongQueryService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async getAllSong(): Promise<Song[]> {
    const result = await this.neo4jService.read(
      `MATCH
                (song : Song) 
              RETURN song`,
      {}
    );

    return result.records.map((song) => {
      const id = song.get("song").properties.id;
      const title = song.get("song").properties.title;
      const res: Song = {
        id,
        name: title,
      };
      return res;
    });
  }

  async getAlbumBySong(id: string) {
    const result = await this.neo4jService.read(
      `MATCH
                (song:Song {id: "${id}"})-[:${SONG_TO_ALBUM}]-(album)
             RETURN album
            `,
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

  async getMusicianBySong(id: string) {
    const result = await this.neo4jService.read(
      `MATCH
                (song:Song {id: "${id}"})-[:${SONG_TO_MUSICIAN}]-(musician)
             RETURN musician
            `,
      {}
    );

    return result.records.map((album) => {
      const res: Musician = {
        id: album.get("musician").properties.id,
        name: album.get("musician").properties.name,
      };
      return res;
    });
  }
}
