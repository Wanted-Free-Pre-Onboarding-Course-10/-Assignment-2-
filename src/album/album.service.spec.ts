import { Test, TestingModule } from "@nestjs/testing";
import { AlbumNotFoundException } from "../exception/album_not_found_exception";
import { Neo4jModule } from "../neo4j/neo4j.module";
import { AlbumService } from "./album.service"
import { CreateAlbumDto } from "./dto/create.album.dto";
import { ResponseAlbumDto } from "./dto/res.album.dto";
import { UpdateAlbumDto } from "./dto/update.album.dto";
import { Genre } from "./genre.enum";

describe('AlbumSevice', () => {
  let service: AlbumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        Neo4jModule.forRoot({
          scheme: 'neo4j+s',
          host: 'e0f0bfda.databases.neo4j.io',
          port: 7687,
          username: 'neo4j',
          password: 'f83YWstyvP9iBxvbtZZpPZh_j7mpq3PXZTFrjntIfaU'
        })
      ],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
  });

  afterEach(async () => {
    await service.clear()
  })

  // == createAlbum test == //
  describe('createAlbum test', () => {
    
    it('앨범 생성 - 성공', async () => {
      //given
      const createAlbumDto: CreateAlbumDto = {
        name: 'LILAC',
        releaseDate: 20210325,
        genre: Genre.DANCE
      }

      //when
      await service.createAlbum(createAlbumDto);
      const result: ResponseAlbumDto[] = await service.getAllAlbums();
      const saveAlbum: ResponseAlbumDto = result[0];

      //then
      expect(saveAlbum.name).toEqual('LILAC');
      expect(saveAlbum.releaseDate).toEqual(20210325);
      expect(saveAlbum.genre).toEqual(Genre.DANCE.valueOf());
      expect(saveAlbum.createdAt).toBeDefined();
      expect(saveAlbum.updatedAt).toEqual(0);
    })

  // == updateAlbumById test == //
    describe('updateAlbumById test', () => {
    
      it('앨범 수정 (이름) - 성공', async () => {
        //given
        const createAlbumDto: CreateAlbumDto = {
          name: 'LILAC',
          releaseDate: 20210325,
          genre: Genre.DANCE
        }

        await service.createAlbum(createAlbumDto);

        const result: ResponseAlbumDto[] = await service.getAllAlbums();
        const saveAlbum: ResponseAlbumDto = result[0];
        const updatedId = saveAlbum.id;

        const updateAlbumDto: UpdateAlbumDto = {
          name: 'COMSMOS'
        }

        //when
        await service.updateAlbumById(updatedId, updateAlbumDto);
        const updateResult: ResponseAlbumDto[] = await service.getAllAlbums();
        const updateAlbum: ResponseAlbumDto = updateResult[0];

        //then
        expect(updateAlbum.name).toEqual('COMSMOS');
        expect(updateAlbum.releaseDate).toEqual(20210325);
        expect(updateAlbum.genre).toEqual(Genre.DANCE.valueOf());
        expect(updateAlbum.createdAt).toBeGreaterThan(0);
        expect(updateAlbum.updatedAt).toBeGreaterThan(0);
      })

      it('앨범 발매일 변경 - 성공', async () => {
        //given
        const createAlbumDto: CreateAlbumDto = {
          name: 'LILAC',
          releaseDate: 20210325,
          genre: Genre.DANCE
        }

        await service.createAlbum(createAlbumDto);

        const result: ResponseAlbumDto[] = await service.getAllAlbums();
        const saveAlbum: ResponseAlbumDto = result[0];
        const updatedId = saveAlbum.id;

        const updateAlbumDto: UpdateAlbumDto = {
          releaseDate: 20190325
        }

        //when
        await service.updateAlbumById(updatedId, updateAlbumDto);
        const updateResult: ResponseAlbumDto[] = await service.getAllAlbums();
        const updateAlbum: ResponseAlbumDto = updateResult[0];

        //then
        expect(updateAlbum.name).toEqual('LILAC');
        expect(updateAlbum.releaseDate).toEqual(20190325);
        expect(updateAlbum.genre).toEqual(Genre.DANCE.valueOf());
        expect(updateAlbum.createdAt).toBeGreaterThan(0);
        expect(updateAlbum.updatedAt).toBeGreaterThan(0);
      })

      it('앨범 수정 실패 - 해당 id의 데이터 없음', async () => {
        //given
        const createAlbumDto: CreateAlbumDto = {
          name: 'LILAC',
          releaseDate: 20210325,
          genre: Genre.DANCE
        }

        await service.createAlbum(createAlbumDto);

        //when
        const wrongUpdateId = 'jowpjtnbpspope';

        const updateAlbumDto: UpdateAlbumDto = {
          releaseDate: 20190325
        }

        //then
        await expect(service.updateAlbumById(wrongUpdateId, updateAlbumDto)).rejects.toThrow(
          new AlbumNotFoundException(wrongUpdateId)
        )
      })
    })
    
    // == deleteAlbum test == //
    describe('deleteAlbum test', () => {
      
      it('앨범 삭제 - 성공', async () => {
        //given
        const createAlbumDto: CreateAlbumDto = {
          name: 'LILAC',
          releaseDate: 20210325,
          genre: Genre.DANCE
        }
        
        await service.createAlbum(createAlbumDto);

        const result: ResponseAlbumDto[] = await service.getAllAlbums();
        const saveAlbum: ResponseAlbumDto = result[0];
        const deletedId = saveAlbum.id;

        //when
        await service.deleteAlbumById(deletedId);
        const deleteResult: ResponseAlbumDto[] = await service.getAllAlbums();

        //then
        expect(deleteResult.length).toEqual(0);
        expect(deleteResult).toEqual([]);
      })
    })

    it('앨범 삭제 실패 - 해당 id의 데이터가 없음', async () => {
      //given
      const createAlbumDto: CreateAlbumDto = {
        name: 'LILAC',
        releaseDate: 20210325,
        genre: Genre.DANCE
      }

      await service.createAlbum(createAlbumDto);

      //when
      const wrongUpdateId = 'jowpjtnbpspope';

      //then
      await expect(service.deleteAlbumById(wrongUpdateId)).rejects.toThrow(
        new AlbumNotFoundException(wrongUpdateId)
      )
    })
  })
})