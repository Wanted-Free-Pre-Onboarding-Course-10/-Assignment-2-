import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { ConnectionException } from "../exception/cannot_connect_exception";
import { DisconnectException } from "../exception/cannot_disconnect_exception";
import { ConnectionFailException } from "../exception/connect_fail_exception";
import { SongNotFoundException } from "../exception/song_not_found_exception";
import {
  CONNECTION_SUCCESS_MSG,
  DELETE_SUCCESS_MSG,
  DISCONNECDTION_SUCCESS_MSG,
} from "../message/messgae";
import { Neo4jService } from "../neo4j/neo4j.service";
import { ConnectionDto } from "./dto/connection.dto";
import { RequestSongDto } from "./dto/req.song.dto";
import { ResponseSongDto } from "./dto/res.song.dto";
import { Song } from "./song.entitiy";
import { SongQueryService } from "./song.query.service";
import { SONG_TO_ALBUM } from "../relation/relation";

@Injectable()
export class SongService {
  private logger = new Logger("SongService");
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly songQueryService: SongQueryService
  ) {}

  // == read Song (for test) == //
  async readAllSongs(): Promise<ResponseSongDto[]> {
    const result = await this.neo4jService.read(
      `MATCH (n : Song) 
             RETURN n
            `,
      {}
    );

    this.logger.debug(result);

    const responseDto: ResponseSongDto[] = result.records.map((value) => {
      const res: ResponseSongDto = ResponseSongDto.createResponseSongDto(
        value.get("n").properties
      );
      return res;
    });

    this.logger.debug(JSON.stringify(responseDto));

    return responseDto;
  }

  // == create Song == //
  async createSong(requestSongDto: RequestSongDto): Promise<ResponseSongDto> {
    const { name } = requestSongDto;

    // musician 객체 생성
    const song: Song = Song.createSong(name);

    const result = await this.neo4jService.write(
      `
            CREATE (n: Song) 
             SET n.name = $name,
                 n.createdAt = $createdAt,
                 n.updatedAt = null,
                 n.id = randomUUID()
             RETURN n
            `,
      {
        name: song.name,
        createdAt: song.createdAt.toString(),
      }
    );

    const createdSong = result.records[0].get("n");

    // == createdSong to dto == //
    const responseDto = ResponseSongDto.createResponseSongDto(
      createdSong.properties
    );

    return responseDto;
  }

  // == update song == //
  async updateSongById(
    id: string,
    requestSongDto: RequestSongDto
  ): Promise<ResponseSongDto> {
    const { name } = requestSongDto;

    const result = await this.neo4jService.write(
      `MATCH (n : Song {id: $id}) 
             SET n.name = $name, n.updatedAt = $updatedAt
             RETURN n
            `,
      {
        id: id,
        name: name,
        updatedAt: new Date().toString(),
      }
    );

    // == 해당 아이디의 음악이 있는지 확인하는 메서드 == //
    this.checkExistenceOfSong(id, result.records);

    // == result to dto == //
    const responsdDto: ResponseSongDto = ResponseSongDto.createResponseSongDto(
      result.records[0].get("n").properties
    );

    return responsdDto;
  }

  // == 음악 삭제  == //
  async deleteSong(id: string): Promise<string> {
    const result = await this.neo4jService.write(
      `MATCH (n : Song {id : $id})
             DELETE n
             RETURN n
            `,
      {
        id: id,
      }
    );

    this.checkExistenceOfSong(id, result.records);

    return DELETE_SUCCESS_MSG;
  }

  // == connect == //
  async connect(
    connectionDto: ConnectionDto,
    endLabel: string,
    relationName: string
  ): Promise<string> {
    if (
      !(await this.isExistedNod(connectionDto.start)) ||
      !(await this.isExistedNod(connectionDto.end))
    )
      throw new ConnectionFailException();

    const result = await this.neo4jService.read(
      `MATCH
                (song:Song {id: "${connectionDto.start}"})-[:${SONG_TO_ALBUM}]-(album)
             RETURN album
            `,
      {}
    );
    console.log(result.records);

    if (result.records.length > 0)
      throw new BadRequestException("한 곡은 앨범 1개만 들어갈 수 있습니다.");

    if (await this.isFollowing(connectionDto, endLabel, relationName)) {
      //관계가 있으면 (관계가 있는데 또 관계 추가하려하면)
      console.log("이미 관계 있다");
      throw new ConnectionException();
    }

    await this.neo4jService.write(
      `
            match (a: Song), (b: ${endLabel})
            where a.id = $start AND b.id = $end
            create (a)-[r:${relationName}]->(b)
            return type(r)
            `,
      {
        start: connectionDto.start,
        end: connectionDto.end,
      }
    );

    return CONNECTION_SUCCESS_MSG;
  }

  // == disconnect ==//
  async disconnect(
    connectionDto: ConnectionDto,
    endLabel: string,
    relationName: string
  ): Promise<string> {
    if (
      !(await this.isExistedNod(connectionDto.start)) ||
      !(await this.isExistedNod(connectionDto.end))
    )
      throw new ConnectionFailException();

    if (!(await this.isFollowing(connectionDto, endLabel, relationName))) {
      //관계가 없으면 (관계가 없는데 삭제하려 하면)
      console.log("관계 없는데 뭘삭제해");
      throw new DisconnectException();
    }

    await this.neo4jService.write(
      `
            match (n :Song{id: $start})-[r:${relationName}]->()
            delete r
            `,
      {
        start: connectionDto.start,
      }
    );

    return DISCONNECDTION_SUCCESS_MSG;
  }

  // == 해당 아이디의 노드가 있는지 확인하는 메서드 == //
  async isExistedNod(id: string) {
    return await this.neo4jService
      .read(
        `match (n {id: $id})
            return count(*) AS count
            `,
        {
          id: id,
        }
      )
      .then((res) => {
        return res.records[0].get("count") > 0;
      });
  }

  // == 관계 있는 지 확인하는 메서드 == //
  async isFollowing(
    connectionDto: ConnectionDto,
    endLabel: string,
    relationName: string
  ): Promise<boolean> {
    return await this.neo4jService
      .read(
        `
            MATCH (target:${endLabel} {id: $end})<-[:${relationName}]-(current:Song {id: $start})
            RETURN count(*) AS count
        `,
        {
          start: connectionDto.start,
          end: connectionDto.end,
        }
      )
      .then((res) => {
        console.log(res.records[0].get("count"));
        return res.records[0].get("count") > 0;
      });
  }

  // == clear DB == //
  async clear() {
    await this.neo4jService.write(
      `
             MATCH (n : Song)
             DETACH DELETE n
            `,
      {}
    );
  }

  // == 해당 아이디의 음악이 없으면 예외처리하는 메서드 == //
  private checkExistenceOfSong(id: string, records: Array<any>) {
    if (records.length == 0) throw new SongNotFoundException(id);
  }
}
