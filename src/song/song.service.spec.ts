import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { SongNotFoundException } from '../exception/song_not_found_exception';
import { Neo4jModule } from '../neo4j/neo4j.module';
import { RequestSongDto } from './dto/req.song.dto';
import { ResponseSongDto } from './dto/res.song.dto';
import { SongService } from './song.service';

describe('SongService', () => {
  let service: SongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // this is test neo4j db
      imports: [
        AppModule
      ],
      providers: [SongService],
    }).compile();

    service = module.get<SongService>(SongService);
  });

  // == db clear == //
  afterEach(async () => {
    await service.clear();
  })

  
  // == createSong test == //
  describe('createSong test', () => {

    it('곡 생성 - 성공', async () => {
      // given
      const requestSongDto: RequestSongDto = {
        name: "라송"
      }

      //when
      const result : ResponseSongDto = await service.createSong(requestSongDto);

      //then
      expect(result.name).toEqual("라송")
      expect(result.createdAt).toBeDefined()
      expect(result.updatedAt).toEqual(0)
    })
  })

  // == updateSongById == //
  describe('update song test', () => {
    
    it('곡 이름 수정 - 성공', async () => {
      //given
      const requestSongDto: RequestSongDto = {
        name: "라송"
      }

      const result : ResponseSongDto = await service.createSong(requestSongDto);
      const responseSongDtos: ResponseSongDto[] = await service.readAllSongs();
      const responseSong: ResponseSongDto = responseSongDtos[0]

      const updateSongDto: RequestSongDto = {
        name: "라라라"
      }

      //when
      const updateResult : ResponseSongDto = await service.updateSongById(responseSong.id, updateSongDto)

      //then
      expect(updateResult.name).toEqual("라라라");
    })

    it('곡 수정 실패 - 해당 아이디 없음', async () => {
      //given
      const requestSongDto: RequestSongDto = {
        name: "라송"
      }

      const result : ResponseSongDto = await service.createSong(requestSongDto);
      
      //when
      const wrongId: string = "wrongID";
      const updateSongDto: RequestSongDto = {
        name: "라라라"
      }

      //then
      await expect(service.updateSongById(wrongId, updateSongDto)).rejects.toThrow(
        new SongNotFoundException(wrongId)
      )
    })
  })

  // == deleteSong test
  describe('deleteSong test', () => {
    
    it('음악 삭제 성공', async () => {
      //given
      const requestSongDto: RequestSongDto = {
        name: "라송"
      }

      const result : ResponseSongDto = await service.createSong(requestSongDto);
      const responseSongDtos: ResponseSongDto[] = await service.readAllSongs();
      const responseSong: ResponseSongDto = responseSongDtos[0]

      const deleteId: string = responseSong.id;

      //when
      await service.deleteSong(deleteId);
  
      const deleteResult: ResponseSongDto[] = await service.readAllSongs();
      
      //then
      expect(deleteResult.length).toEqual(0);
      expect(deleteResult).toEqual([]);
    })
  })

  it('음악 삭제 실패 - 헤당 아이디의 음악이 없음', async () => {
    //given
    const requestSongDto: RequestSongDto = {
      name: "라송"
    }

    const result : ResponseSongDto = await service.createSong(requestSongDto);

    //when
    const wrongId: string = "wrongId";

    //then
    await expect(service.deleteSong(wrongId)).rejects.toThrow(
      new SongNotFoundException(wrongId)
    )
  })
  
  
});
