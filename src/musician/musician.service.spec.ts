import { Test, TestingModule } from '@nestjs/testing';
import { MusicianNotFoundException } from '../exception/musician_not_found_exception';
import { Neo4jModule } from '../neo4j/neo4j.module';
import { CreateMusicianDto } from './dto/create.musician.dto';
import { ResponseMusicianDto } from './dto/res.musician.dto';
import { UpdateMusicianDto } from './dto/update.musician.dto';
import { Gender } from './gender.enum';
import { MusicianService } from './musician.service';

describe('MusicianService', () => {
  let service: MusicianService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // this is test neo4j db
      imports: [
        Neo4jModule.forRoot({
          scheme: 'neo4j+s',
          host: 'e0f0bfda.databases.neo4j.io',
          port: 7687,
          username: 'neo4j',
          password: 'f83YWstyvP9iBxvbtZZpPZh_j7mpq3PXZTFrjntIfaU'
        })
      ],
      providers: [MusicianService],
    }).compile();

    service = module.get<MusicianService>(MusicianService);
  });

  afterEach(async () => {
    await service.clear()
  })

  // == createMusician test == //
  describe('createMusician test', () => {

    it('뮤지션 생성 - 성공', async () => {
      //given
      const createMusicianDto: CreateMusicianDto = {
        name: '염재선',
        age: 16,
        gender: Gender.MALE
      }

      //when
      await service.createMusician(createMusicianDto);
      const result: ResponseMusicianDto[] = await service.getAllMusicians();
      const saveMusician: ResponseMusicianDto = result[0];

      //then
      expect(saveMusician.name).toEqual('염재선');
      expect(saveMusician.age).toEqual(16);
      expect(saveMusician.gender).toEqual(Gender.MALE.valueOf());
      expect(saveMusician.createdAt).toBeDefined();
      expect(saveMusician.updatedAt).toEqual(0);
    })
  })

  // == updateMusicianById  test== //
  describe('updateMusicianById test', () => {

    it('뮤지션 수정 (이름) - 성공', async () => {
      //given
      const createMusicianDto: CreateMusicianDto = {
        name: '염재선',
        age: 16,
        gender: Gender.MALE
      }

      await service.createMusician(createMusicianDto);

      const result: ResponseMusicianDto[] = await service.getAllMusicians();
      const saveMusician: ResponseMusicianDto = result[0];
      const updateId = saveMusician.id;

      const updateMusicianDto: UpdateMusicianDto = {
        name: 'tester'
      }
      //when
      await service.updateMusicianById(updateId, updateMusicianDto)
      const updateResult: ResponseMusicianDto[] = await service.getAllMusicians();
      const updateMusician: ResponseMusicianDto = updateResult[0];

      //then
      expect(updateMusician.name).toEqual('tester')
      expect(updateMusician.age).toEqual(16);
      expect(updateMusician.gender).toEqual(Gender.MALE.valueOf());
      expect(updateMusician.createdAt).toBeGreaterThan(0);
      expect(updateMusician.updatedAt).toBeGreaterThan(0);
    })

    it('뮤지션 나이 변경 - 성공', async () => {
      //given
      const createMusicianDto: CreateMusicianDto = {
        name: '염재선',
        age: 16,
        gender: Gender.MALE
      }

      await service.createMusician(createMusicianDto);

      const result: ResponseMusicianDto[] = await service.getAllMusicians();
      const saveMusician: ResponseMusicianDto = result[0];
      const updateId = saveMusician.id;

      const updateMusicianDto: UpdateMusicianDto = {
        age: 10
      }

      //when
      await service.updateMusicianById(updateId, updateMusicianDto)
      const updateResult: ResponseMusicianDto[] = await service.getAllMusicians();
      const updateMusician: ResponseMusicianDto = updateResult[0];

      //then
      expect(updateMusician.name).toEqual('염재선')
      expect(updateMusician.age).toEqual(10);
      expect(updateMusician.gender).toEqual(Gender.MALE.valueOf());
      expect(updateMusician.createdAt).toBeGreaterThan(0);
      expect(updateMusician.updatedAt).toBeGreaterThan(0);
    })

    it('뮤지션 수정 실패 - 해당 id의 데이터 없음', async () => {
      //given
      const createMusicianDto: CreateMusicianDto = {
        name: '염재선',
        age: 16,
        gender: Gender.MALE
      }

      await service.createMusician(createMusicianDto);


      //when
      const wrongUpdateId = 'adsfasdfasdfasdfasdf';

      const updateMusicianDto: UpdateMusicianDto = {
        age: 10
      }

      //then
      await expect(service.updateMusicianById(wrongUpdateId, updateMusicianDto)).rejects.toThrow(
        new MusicianNotFoundException(wrongUpdateId)
      )
    })
  })

  //==  deleteMusician test == //
  describe('deleteMusician test', () => {

    it('뮤지션 삭제 - 성공', async () => {
      //given
      const createMusicianDto: CreateMusicianDto = {
        name: '염재선',
        age: 16,
        gender: Gender.MALE
      }

      await service.createMusician(createMusicianDto);

      const result: ResponseMusicianDto[] = await service.getAllMusicians();
      const saveMusician: ResponseMusicianDto = result[0];
      const deleteId = saveMusician.id;

      //when
      await service.deleteMusician(deleteId);
      const deleteResult: ResponseMusicianDto[] = await service.getAllMusicians();

      //then
      expect(deleteResult.length).toEqual(0)
      expect(deleteResult).toEqual([])
    })

    it('뮤지션 삭제 실패 - 해당 id의 데이터가 없음', async () => {
      //given
      const createMusicianDto: CreateMusicianDto = {
        name: '염재선',
        age: 16,
        gender: Gender.MALE
      }

      await service.createMusician(createMusicianDto);

      //when
      const wrongDeleteId = "wrongDeleteId";

      //then
      await expect(service.deleteMusician(wrongDeleteId)).rejects.toThrow(
        new MusicianNotFoundException(wrongDeleteId)
      )
    })
  })


});
