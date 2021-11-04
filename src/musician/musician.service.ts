import { Injectable, Logger } from '@nestjs/common';
import { Node } from 'neo4j-driver';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { MusicianGraphqlDto } from './dto/graphql.musician.dto';
import { MusicianDto } from './dto/musician.dto';
import { ResponseMusicianDto } from './dto/res.musician.dto';

export type Musician = Node;

@Injectable()
export class MusicianService {
  private logger = new Logger('MusicianService');
  constructor(private readonly neo4jService: Neo4jService) {}

  async getAllMusicians(): Promise<ResponseMusicianDto[]> {
    const result = await this.neo4jService.read(
      `MATCH (n : Musician) 
             RETURN n
            `,
      {},
    );

    const responseDto: ResponseMusicianDto[] = result.records.map((value) => {
      const res: ResponseMusicianDto = {
        id: value.get('n').properties.id,
        name: value.get('n').properties.name,
        age: value.get('n').properties.age,
      };

      return res;
    });

    this.logger.debug(JSON.stringify(responseDto));

    return responseDto;
  }

  async getMusiciansGraphql(): Promise<MusicianGraphqlDto[]> {
    const result = await this.neo4jService.read(
      `MATCH (n : Musician) 
             RETURN n
            `,
      {},
    );

    const responseDto: MusicianGraphqlDto[] = result.records.map((value) => {
      const res: ResponseMusicianDto = {
        id: value.get('n').properties.id,
        name: value.get('n').properties.name,
        age: value.get('n').properties.age,
      };

      return res;
    });

    return responseDto;
  }

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
      },
    );

    return result.records[0].get('n');
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
      },
    );

    console.log(result);
  }

  async deleteMusicianByName(name: string) {
    const result = await this.neo4jService.write(
      `MATCH (n {name : $name})
             DELETE n
             RETURN n
            `,
      {
        name: name,
      },
    );

    this.logger.debug(`deleted node : ${result}`);
  }
}
