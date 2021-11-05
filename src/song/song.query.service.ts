import { Injectable } from "@nestjs/common";
import { Neo4jService } from "../neo4j/neo4j.service";
import { Song } from "../song/graph.song.entity";

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
      const songId = song.get("song").properties.songId;
      const title = song.get("song").properties.title;
      const res: Song = {
        songId,
        title,
      };
      return res;
    });
  }
}
