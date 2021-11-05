import { Injectable, Logger } from '@nestjs/common';
import { SongNotFoundException } from '../exception/song_not_found_exception';
import { DELETE_SUCCESS_MSG } from '../message/messgae';
import { Neo4jService } from '../neo4j/neo4j.service'
import { RequestSongDto } from './dto/req.song.dto';
import { ResponseSongDto } from './dto/res.song.dto';
import { Song } from './song.entitiy';

@Injectable()
export class SongService {
    private logger = new Logger("SongService");
    constructor(private readonly neo4jService : Neo4jService) {}

    // == read Song (for test) == //
    async readAllSongs() : Promise<ResponseSongDto[]>{
        const result = await this.neo4jService.read(
            `MATCH (n : Song) 
             RETURN n
            `, 
            {}
        )

        this.logger.debug(result)

        const responseDto : ResponseSongDto[] = result.records.map(value => {

            const res : ResponseSongDto = ResponseSongDto.createResponseSongDto(value.get('n').properties)
            return res;
        })

        this.logger.debug(JSON.stringify(responseDto))

        return responseDto
    }

    // == create Song == //
    async createSong(requestSongDto : RequestSongDto): Promise<ResponseSongDto>{
        const {name} = requestSongDto;

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
            `
            , {
                name : song.name,
                createdAt : song.createdAt.toString(),
            }
        )

        const createdSong = result.records[0].get('n');

        // == createdSong to dto == //
        const responseDto = ResponseSongDto.createResponseSongDto(createdSong.properties);

        return responseDto
    }

    // == update song == //
    async updateSongById(id: string, requestSongDto: RequestSongDto) : Promise<ResponseSongDto>{
        const { name } = requestSongDto;

        const result = await this.neo4jService.write(
            `MATCH (n : Song {id: $id}) 
             SET n.name = $name, n.updatedAt = $updatedAt
             RETURN n
            `, 
            {
                id: id,
                name: name,
                updatedAt: (new Date()).toString()
            }
        )

        // == 해당 아이디의 음악이 있는지 확인하는 메서드 == //
        this.checkExistenceOfSong(id, result.records);

        // == result to dto == //
        const responsdDto : ResponseSongDto = ResponseSongDto.createResponseSongDto(result.records[0].get('n').properties);

        return responsdDto;
    }

    // == 음악 삭제  == //
    async deleteSong(id: string): Promise<string>{
        const result = 
        await this.neo4jService.write(
            `MATCH (n : Song {id : $id})
             DELETE n
             RETURN n
            `,
            {
                id : id
            }
        );

        this.checkExistenceOfSong(id, result.records);

        return DELETE_SUCCESS_MSG;
    }

    // == clear DB == //
    async clear(){
        await this.neo4jService.write(
            `
             MATCH (n : Song)
             DETACH DELETE n
            `,
            {}
        );
    }

    // == 해당 아이디의 음악이 없으면 예외처리하는 메서드 == //
    private checkExistenceOfSong(id: string, records: Array<any>){
        if(records.length == 0)
            throw new SongNotFoundException(id);
    }
}
