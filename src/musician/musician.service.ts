import { Injectable, Logger } from '@nestjs/common';
import { response } from 'express';
import { Node } from 'neo4j-driver';
import { MusicianNotFoundException } from '../exception/musician_not_found_exception';
import { DELETE_SUCCESS_MSG } from '../message/messgae';
import { Neo4jService } from '../neo4j/neo4j.service';
import { CreateMusicianDto } from './dto/create.musician.dto';
import { ResponseMusicianDto } from './dto/res.musician.dto';
import { UpdateMusicianDto } from './dto/update.musician.dto';
import { Musician } from './musician.entity';

export type MusicianLabel = Node

@Injectable()
export class MusicianService {
    private logger = new Logger('MusicianService')
    constructor(private readonly neo4jService : Neo4jService) {}

    //== read all musiccian  == //
    async getAllMusicians() : Promise<ResponseMusicianDto[]>{
        const result = await this.neo4jService.read(
            `MATCH (n : Musician) 
             RETURN n
            `, 
            {}
        )

        this.logger.debug(result)

        const responseDto : ResponseMusicianDto[] = result.records.map(value => {

            const res : ResponseMusicianDto = ResponseMusicianDto.createResponseMusicianDto(value.get('n').properties)
            return res;
        })

        this.logger.debug(JSON.stringify(responseDto))

        return responseDto
    }

    // == create musician == //
    async createMusician(createMusicianDto: CreateMusicianDto): Promise<ResponseMusicianDto>{
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
            `
            , {
                name : musician.name,
                age : musician.age,
                gender : musician.gender,
                createdAt : musician.createdAt.toString(),
            })

        const createdMusician = result.records[0].get('n');

        // == createdMusician to dto == //
        const repsonseDto = ResponseMusicianDto.createResponseMusicianDto(createdMusician.properties);

        this.logger.debug(`created method: ${JSON.stringify(response)}`)

        return repsonseDto;
    }

    // == update musician == //
    async updateMusicianById(id: string, updateMusicianDto: UpdateMusicianDto) : Promise<ResponseMusicianDto>{
        const { name, age } = updateMusicianDto;

        let updatedMusician;

        // 이름 업데이트
        if(name){
            updatedMusician = await this.updateName(id, name);
        }

        // 나이 업데이트
        if(age){
            updatedMusician = await this.updateAge(id, age);
        }

        // == updatedMusician to dto == //
        const repsonseDto = ResponseMusicianDto.createResponseMusicianDto(updatedMusician.properties);
        
        this.logger.debug(`updatedMusician : ${repsonseDto}`)

        return repsonseDto;
    }

    // == delete musician == //
    async deleteMusician(id : string) : Promise<string>{
        const result = 
        await this.neo4jService.write(
            `MATCH (n {id : $id})
             DELETE n
             RETURN n
            `,
            {
                id : id
            }
        );

        this.checkExistenceOfMusician(id, result.records);
        
        return DELETE_SUCCESS_MSG;
    }

    // == clear DB == //
    async clear(){
        await this.neo4jService.write(
            `
             MATCH (n)
             DETACH DELETE n
            `,
            {}
        );
    }

    // == 해당 아이디의 뮤지션이 없으면 예외처리하는 메서드 == //
    private checkExistenceOfMusician(id: string, records: Array<any>){
        if(records.length == 0)
            throw new MusicianNotFoundException(id);
    }

    // == 뮤지션 이름 업데이트 == //
    private async updateName(id: string, name: string){
        const result = await this.neo4jService.write(
            `MATCH (n {id: $id}) 
             SET n.name = $name, n.updatedAt = $updatedAt
             RETURN n
            `, 
            {
                id: id,
                name: name,
                updatedAt: (new Date()).toString()
            }
        )
        
        // == 해당아이디의 뮤지션이 있는지 확인 하는 메서드 == //
        this.checkExistenceOfMusician(id, result.records);

        this.logger.debug(`update Name success : ${result}`)

        return result.records[0].get('n');
    }

    // == 뮤지션 나이 업데이트 == //
    private async updateAge(id: string, age: number){
        const result = await this.neo4jService.write(
            `MATCH (n {id: $id}) 
             SET n.age = $age, n.updatedAt = $updatedAt
             RETURN n
            `, 
            {
                id: id,
                age: age,
                updatedAt: (new Date()).toString()

            }
        )

        // == 해당아이디의 뮤지션이 있는지 확인 하는 메서드 == //
        this.checkExistenceOfMusician(id, result.records)

        return result.records[0].get('n');
    }
}
