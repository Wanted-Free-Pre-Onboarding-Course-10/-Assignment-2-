import { Injectable } from "@nestjs/common";
import { Neo4jService } from "../neo4j/neo4j.service";
import { CreateAlbumDto } from "./dto/create.album.dto";
import { ResponseAlbumDto } from "./dto/res.album.dto";
import { Album } from "./album.entity";
import { UpdateAlbumDto } from "./dto/update.album.dto";
import {
  CONNECTION_SUCCESS_MSG,
  DELETE_SUCCESS_MSG,
  DISCONNECDTION_SUCCESS_MSG,
} from "../message/messgae";
import { ConnectionDto } from "../song/dto/connection.dto";
import { ConnectionFailException } from "../exception/connect_fail_exception";
import { ConnectionException } from "../exception/cannot_connect_exception";
import { DisconnectException } from "../exception/cannot_disconnect_exception";

import { AlbumNotFoundException } from "../exception/album_not_found_exception";

export type AlbumLabel = Node;

@Injectable()
export class AlbumService {
  constructor(private readonly neo4jService: Neo4jService) {}

  // == read Album == //
  async getAllAlbums(): Promise<ResponseAlbumDto[]> {
    const result = await this.neo4jService.read(
      `MATCH (n : Album) 
           RETURN n
          `,
      {}
    );

    const responseDto: ResponseAlbumDto[] = result.records.map((value) => {
      const res: ResponseAlbumDto = ResponseAlbumDto.createResponseAlnumDto(
        value.get("n").properties
      );
      return res;
    });
    return responseDto;
  }

  // == create Album == //
  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<ResponseAlbumDto> {
    const { name, releaseDate, genre } = createAlbumDto;

    // album 객체 생성
    const album: Album = Album.createAlbum(name, releaseDate, genre);

    const result = await this.neo4jService.write(
      `
        CREATE (n: Album) 
         SET n.name = $name,
             n.releaseDate = $releaseDate,
             n.genre = $genre,
             n.createdAt = $createdAt,
             n.updatedAt = null,
             n.id = randomUUID()
         RETURN n
      `,
      {
        name: album.name,
        releaseDate: album.releaseDate,
        genre: album.genre,
        createdAt: album.createdAt.toString(),
      }
    );
    const createdAlbum = result.records[0].get("n");

    // == createdAlbum to dto == //
    const responseDto = ResponseAlbumDto.createResponseAlnumDto(
      createdAlbum.properties
    );

    return responseDto;
  }

  // == update album == //
  async updateAlbumById(
    id: string,
    updateAlbumDto: UpdateAlbumDto
  ): Promise<ResponseAlbumDto> {
    const { name, releaseDate, genre } = updateAlbumDto;

    let updatedAlbum;

    // name이 들어왔을 경우
    if (name) {
      updatedAlbum = await this.neo4jService.write(
        `MATCH (n : Album {id: $id})
         SET n.name = $name, n.updatedAt = $updatedAt
         RETURN n
         `,
        {
          id,
          name,
          updatedAt: new Date().toString(),
        }
      );
    }

    // releaseDate이 들어왔을 경우
    if (releaseDate) {
      updatedAlbum = await this.neo4jService.write(
        `MATCH (n : Album {id: $id})
         SET n.releaseDate = $releaseDate, n.updatedAt = $updatedAt
         RETURN n
        `,
        {
          id,
          releaseDate,
          updatedAt: new Date().toString(),
        }
      );
    }

    // genre가 들어왔을 경우
    if (genre) {
      updatedAlbum = await this.neo4jService.write(
        `MATCH (n : Album {id: $id})
         SET n.genre = $genre, n.updatedAt = $updatedAt
         RETURN n
        `,
        {
          id,
          genre,
          updatedAt: new Date().toString(),
        }
      );
    }

    // == 해당 아이디의 앨범이 있는지 확인 == //
    this.checkExistenceOfAlbum(id, updatedAlbum.records);

    // == updatedAlbum to dto == //
    const responseDto = ResponseAlbumDto.createResponseAlnumDto(
      updatedAlbum.records[0].get("n").properties
    );

    return responseDto;
  }

  // == delete album == //
  async deleteAlbumById(id: string): Promise<string> {
    const result = await this.neo4jService.write(
      `MATCH (n : Album {id : $id})
             DELETE n
             RETURN n
            `,
      {
        id: id,
      }
    );
    // == 해당 아이디의 앨범이 있는지 확인 == //
    this.checkExistenceOfAlbum(id, result.records);

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

    if (await this.isFollowing(connectionDto, endLabel, relationName)) {
      //관계가 있으면 (관계가 있는데 또 관계 추가하려하면)
      console.log("이미 관계 있다");
      throw new ConnectionException();
    }

    await this.neo4jService.write(
      `
        match (a: Album), (b: ${endLabel})
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
        match (n :Album{id: $start})-[r:${relationName}]->()
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
          MATCH (target:${endLabel} {id: $end})<-[:${relationName}]-(current:Album {id: $start})
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

  // == 해당 아이디의 앨범이 없으면 예외처리하는 메서드 == //
  private checkExistenceOfAlbum(id: string, records: Array<any>) {
    if (records.length == 0) throw new AlbumNotFoundException(id);
  }

  // == clear DB == //
  async clear() {
    await this.neo4jService.write(
      `
             MATCH (n : Album)
             DETACH DELETE n
            `,
      {}
    );
  }
}
