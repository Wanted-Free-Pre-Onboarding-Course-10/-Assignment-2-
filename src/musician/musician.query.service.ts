import { Injectable, Logger } from "@nestjs/common";
import { Node } from "neo4j-driver-core";
import { Neo4jService } from "../neo4j/neo4j.service";
import { MusicianGraphqlDto } from "./dto/graphql.musician.dto";
import { MusicianDto } from "./dto/musician.dto";
import { ResponseMusicianDto } from "./dto/res.musician.dto";

export type Musician = Node;

@Injectable()
export class MusicianQueryService {
  private logger = new Logger("MusicianService");
  constructor(private readonly neo4jService: Neo4jService) {}

  async createMusician(musicianDto: MusicianDto): Promise<Musician> {
    const { name, age } = musicianDto;

    const result = await this.neo4jService.write(
      `CREATE (n: Musician) 
             SET n += $properties, n.id = randomUUID()
             RETURN n
            `,
      {
        properties: {
          name,
          age,
        },
      }
    );

    return result.records[0].get("n");
  }

  async updateMusicianAge(musicianDto: MusicianDto) {
    const result = await this.neo4jService.write(
      `MATCH (n {name : $name})
             SET n.age = $age
             RETURN n
            `,
      {
        name: musicianDto.name,
        age: musicianDto.age,
      }
    );
  }

  async deleteMusicianByName(name: string) {
    const result = await this.neo4jService.write(
      `MATCH (n {name : $name})
             DELETE n
             RETURN n
            `,
      {
        name: name,
      }
    );

    this.logger.debug(`deleted node : ${result}`);
  }
}
