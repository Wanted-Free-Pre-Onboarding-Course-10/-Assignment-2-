import { Injectable } from "@nestjs/common";
import { Neo4jService } from "../neo4j/neo4j.service";
import { Musician } from "./graph.musician.entity";

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
}
