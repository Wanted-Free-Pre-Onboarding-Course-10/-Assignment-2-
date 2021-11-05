import { Test, TestingModule } from "@nestjs/testing";
import { MusicianQueryService } from "./musician.query.service";
import { Neo4jService } from "../neo4j/neo4j.service";
import * as faker from "faker";

const mockNeo4jService = {
  read: jest.fn(),
};
describe("MusicianService", () => {
  let service: MusicianQueryService;
  let neo4jService: Neo4jService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MusicianQueryService,
        {
          provide: Neo4jService,
          useValue: mockNeo4jService,
        },
      ],
    }).compile();

    service = module.get<MusicianQueryService>(MusicianQueryService);
    neo4jService = module.get<Neo4jService>(Neo4jService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should be defined", () => {
    expect(neo4jService).toBeDefined();
  });

  describe("getAllMusician", () => {
    it("모든 뮤지션을 반환해야한다.", async () => {
      // given
      const musicianRecord = {
        get: jest.fn().mockReturnValue({
          properties: {
            musicianId: faker.datatype.uuid(),
            name: faker.name.title(),
          },
        }),
      };
      neo4jService.read = jest.fn().mockResolvedValueOnce({
        records: [musicianRecord],
      });

      // when
      const result = service.getAllMusician();

      // then
      await expect(result).resolves.toBeTruthy();
    });
  });

  describe("getAlbumByMusician", () => {
    it("뮤지션 아이디를 통한 앨범을 반환을 해야한다.", async () => {
      // given
      const musicianId = faker.datatype.uuid();
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
      const result = await service.getAlbumByMusician(musicianId);

      // then
      expect(result[0].albumId).toBeTruthy();
    });
  });
});
