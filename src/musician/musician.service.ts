import { Injectable, Logger } from "@nestjs/common";
import { response } from "express";
import { Node } from "neo4j-driver";
import { ConnectionException } from "src/exception/cannot_connect_exception";
import { DisconnectException } from "src/exception/cannot_disconnect_exception";
import { ConnectionFailException } from "src/exception/connect_fail_exception";
import { ConnectionDto } from "src/song/dto/connection.dto";
import { MusicianNotFoundException } from "../exception/musician_not_found_exception";
import { CONNECTION_SUCCESS_MSG, DELETE_SUCCESS_MSG, DISCONNECDTION_SUCCESS_MSG } from "../message/messgae";
import { Neo4jService } from "../neo4j/neo4j.service";
import { CreateMusicianDto } from "./dto/create.musician.dto";
import { ResponseMusicianDto } from "./dto/res.musician.dto";
import { UpdateMusicianDto } from "./dto/update.musician.dto";
import { Musician } from "./musician.entity";

export type MusicianLabel = Node;

@Injectable()
export class MusicianService {
  private logger = new Logger("MusicianService");
  constructor(private readonly neo4jService: Neo4jService) {}

  //== read all musiccian  == //
  async getAllMusicians(): Promise<ResponseMusicianDto[]> {
    const result = await this.neo4jService.read(
      `MATCH (n : Musician) 
             RETURN n
            `,
      {}
    );

    this.logger.debug(result);

    const responseDto: ResponseMusicianDto[] = result.records.map((value) => {
      const res: ResponseMusicianDto =
        ResponseMusicianDto.createResponseMusicianDto(
          value.get("n").properties
        );
      return res;
    });

    this.logger.debug(JSON.stringify(responseDto));

    return responseDto;
  }

  // == create musician == //
  async createMusician(
    createMusicianDto: CreateMusicianDto
  ): Promise<ResponseMusicianDto> {
    const { name, age, gender } = createMusicianDto;

    // musician 객체 생성
    const musician: Musician = Musician.createMusician(name, age, gender);

    const result = await this.neo4jService.write(
      `
            CREATE (n: Musician) 
             SET n.name = $name,
                 n.age = $age,
                 n.gender = $gender,
                 n.createdAt = $createdAt,
                 n.updatedAt = null,
                 n.id = randomUUID()
             RETURN n
            `,
      {
        name: musician.name,
        age: musician.age,
        gender: musician.gender,
        createdAt: musician.createdAt.toString(),
      }
    );

    const createdMusician = result.records[0].get("n");

    // == createdMusician to dto == //
    const repsonseDto = ResponseMusicianDto.createResponseMusicianDto(
      createdMusician.properties
    );

    this.logger.debug(`created method: ${JSON.stringify(response)}`);

    return repsonseDto;
  }

  // == update musician == //
  async updateMusicianById(
    id: string,
    updateMusicianDto: UpdateMusicianDto
  ): Promise<ResponseMusicianDto> {
    const { name, age } = updateMusicianDto;

    let updatedMusician;

    // 이름 업데이트
    if (name) {
      updatedMusician = await this.updateName(id, name);
    }

    // 나이 업데이트
    if (age) {
      updatedMusician = await this.updateAge(id, age);
    }
    // == updatedMusician to dto == //
    const repsonseDto = ResponseMusicianDto.createResponseMusicianDto(
      updatedMusician.properties
    );

    this.logger.debug(`updatedMusician : ${repsonseDto}`);

    return repsonseDto;
  }

  // == delete musician == //
  async deleteMusician(id: string): Promise<string> {
    const result = await this.neo4jService.write(
      `MATCH (n : Musician {id : $id})
             DELETE n
             RETURN n
            `,
      {
        id: id,
      }
    );

    this.checkExistenceOfMusician(id, result.records);

    return DELETE_SUCCESS_MSG;
  }

  // == connect == //
  async connect(connectionDto: ConnectionDto, endLabel: string, relationName: string): Promise<string>{
    if(!await this.isExistedNod(connectionDto.start) || !await this.isExistedNod(connectionDto.end))
        throw new ConnectionFailException();

    if(await this.isFollowing(connectionDto, endLabel, relationName)){
        //관계가 있으면 (관계가 있는데 또 관계 추가하려하면)
        console.log("이미 관계 있다")
        throw new ConnectionException();
    }

    await this.neo4jService.write(
        `
        match (a: Musician), (b: ${endLabel})
        where a.id = $start AND b.id = $end
        create (a)-[r:${relationName}]->(b)
        return type(r)
        `,
        {
            start: connectionDto.start,
            end: connectionDto.end,
        }
    )

    return CONNECTION_SUCCESS_MSG 
}

// == disconnect ==//
async disconnect(connectionDto: ConnectionDto, endLabel: string, relationName: string): Promise<string>{
    if(!await this.isExistedNod(connectionDto.start) || !await this.isExistedNod(connectionDto.end))
        throw new ConnectionFailException();

    if(!await this.isFollowing(connectionDto, endLabel, relationName)){
        //관계가 없으면 (관계가 없는데 삭제하려 하면)
        console.log("관계 없는데 뭘삭제해")
        throw new DisconnectException();
    }        
    
    await this.neo4jService.write(
        `
        match (n :Musician{id: $start})-[r:${relationName}]->()
        delete r
        `,
        {
            start: connectionDto.start,
        }
    )

    return DISCONNECDTION_SUCCESS_MSG
}

// == 해당 아이디의 노드가 있는지 확인하는 메서드 == //
async isExistedNod(id: string){
    return await this.neo4jService.read(
        `match (n {id: $id})
        return count(*) AS count
        `,
        {
            id: id
        }
    )
    .then(res => {
        return res.records[0].get('count') > 0
    })
}

// == 관계 있는 지 확인하는 메서드 == //
async isFollowing(connectionDto: ConnectionDto ,endLabel: string, relationName: string): Promise<boolean>{
    return await this.neo4jService.read(`
        MATCH (target:${endLabel} {id: $end})<-[:${relationName}]-(current:Musician {id: $start})
        RETURN count(*) AS count
    `, {
        start: connectionDto.start,
        end: connectionDto.end,
    })
    .then(res => {
        console.log(res.records[0].get('count'))
        return res.records[0].get('count') > 0
    })
}

  // == clear DB == //
  async clear() {
    await this.neo4jService.write(
      `
             MATCH (n : Musician)
             DETACH DELETE n
            `,
      {}
    );
  }

  // == 해당 아이디의 뮤지션이 없으면 예외처리하는 메서드 == //
  private checkExistenceOfMusician(id: string, records: Array<any>) {
    if (records.length == 0) throw new MusicianNotFoundException(id);
  }

  // == 뮤지션 이름 업데이트 == //
  private async updateName(id: string, name: string) {
    const result = await this.neo4jService.write(
      `MATCH (n : Musician {id: $id}) 
             SET n.name = $name, n.updatedAt = $updatedAt
             RETURN n
            `,
      {
        id: id,
        name: name,
        updatedAt: new Date().toString(),
      }
    );

    // == 해당아이디의 뮤지션이 있는지 확인 하는 메서드 == //
    this.checkExistenceOfMusician(id, result.records);

    this.logger.debug(`update Name success : ${result}`);

    return result.records[0].get("n");
  }

  // == 뮤지션 나이 업데이트 == //
  private async updateAge(id: string, age: number) {
    const result = await this.neo4jService.write(
      `MATCH (n : Musician {id: $id}) 
             SET n.age = $age, n.updatedAt = $updatedAt
             RETURN n
            `,
      {
        id: id,
        age: age,
        updatedAt: new Date().toString(),
      }
    );

    // == 해당아이디의 뮤지션이 있는지 확인 하는 메서드 == //
    this.checkExistenceOfMusician(id, result.records);

    return result.records[0].get("n");
  }
}
