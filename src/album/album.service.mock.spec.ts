import { Test, TestingModule } from "@nestjs/testing";
import { AlbumQueryService } from "./album.query.service";
import { Neo4jService } from "../neo4j/neo4j.service";
import * as faker from "faker";

const mockNeo4jService = {
  read: jest.fn(),
};

jest.mock("neo4j-driver");
describe("AlbumService", () => {
  let service: AlbumQueryService;
  let neo4jService: Neo4jService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumQueryService,
        {
          provide: Neo4jService,
          useValue: mockNeo4jService,
        },
      ],
    }).compile();

    service = module.get<AlbumQueryService>(AlbumQueryService);
    neo4jService = module.get<Neo4jService>(Neo4jService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should be defined", () => {
    expect(neo4jService).toBeDefined();
  });

  describe("getAllAlbum", () => {
    it("특별한 오류가 없다면 Neo4j에 있는 모든 Album을 반환해야한다", async () => {
      // given
      const albumRecord = {
        get: jest.fn().mockReturnValue({
          properties: {
            albumId: faker.datatype.uuid(),
            name: faker.name.title(),
          },
        }),
      };

      neo4jService.read = jest.fn().mockResolvedValueOnce({
        records: [albumRecord],
      });

      // when
      const result = service.getAllAlbum();

      // then
      await expect(result).resolves.toBeTruthy();
    });

    it("잘못된 프로퍼티를 요청할 경우 Unknown 오류를 낸다.", async () => {
      // given
      const wrongAlbumRecord = {
        get: jest.fn().mockReturnValue({
          properties: {
            musicianId: faker.datatype.uuid(),
            name: faker.name.title(),
          },
        }),
      };

      neo4jService.read = jest.fn().mockResolvedValueOnce({
        records: [wrongAlbumRecord],
      });

      // when
      const result = await service.getAllAlbum();

      // then
      expect(result[0].albumId).toBeUndefined();
    });
  });

  describe("getMusicianByAlbum", () => {
    it("곡이 아닌, 반드시 뮤지션을 반환해야한다.", async () => {
      // given
      const musicianRecord = {
        get: jest.fn().mockReturnValue({
          properties: {
            musicianId: faker.datatype.uuid(),
            name: faker.name.title(),
          },
        }),
      };

      const albumId = faker.datatype.uuid();

      neo4jService.read = jest.fn().mockResolvedValueOnce({
        records: [musicianRecord],
      });

      // when
      const result = await service.getMusicianByAlbum(albumId);

      // then
      expect(result[0].musicianId).toBeTruthy();
    });

    it("앨범과 곡의 관계 설정이 잘못되어있다면 빈 배열을 반환한다.", async () => {
      // given
      const albumId = faker.datatype.uuid();
      neo4jService.read = jest.fn().mockResolvedValue({
        records: [],
      });

      // when
      const result = await service.getMusicianByAlbum(albumId);

      // then
      expect(result.length === 0).toBeTruthy();
    });
  });

  describe("getSongByAlbum", () => {
    it("반환된 노래에는 songId가 있어야한다.", async () => {
      // given
      const songRecord = {
        get: jest.fn().mockReturnValue({
          properties: {
            songId: faker.datatype.uuid(),
            name: faker.name.title(),
          },
        }),
      };

      const albumId = faker.datatype.uuid();

      neo4jService.read = jest.fn().mockResolvedValueOnce({
        records: [songRecord],
      });

      // when
      const result = await service.getSongByAlbum(albumId);

      // then
      expect(result[0].songId).toBeTruthy();
    });
  });
});
