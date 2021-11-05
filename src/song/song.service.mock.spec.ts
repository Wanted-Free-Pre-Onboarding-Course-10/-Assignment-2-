import { Test, TestingModule } from "@nestjs/testing";
import { Neo4jService } from "../neo4j/neo4j.service";
import { SongQueryService } from "./song.query.service";
import * as faker from "faker";

const mockNeo4jService = {
  read: jest.fn(),
};

jest.mock("neo4j-driver");
describe("AlbumService", () => {
  let songQueryService: SongQueryService;
  let neo4jService: Neo4jService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongQueryService,
        {
          provide: Neo4jService,
          useValue: mockNeo4jService,
        },
      ],
    }).compile();

    songQueryService = module.get<SongQueryService>(SongQueryService);
    neo4jService = module.get<Neo4jService>(Neo4jService);
  });

  it("should be defined", () => {
    expect(songQueryService).toBeDefined();
  });

  it("should be defined", () => {
    expect(neo4jService).toBeDefined();
  });

  describe("getAllSong", () => {
    it("특별한 오류가 없다면 Neo4j에 있는 모든 Song을 반환해야한다", async () => {
      // given
      const songRecord = {
        get: jest.fn().mockReturnValue({
          properties: {
            songId: faker.datatype.uuid(),
            name: faker.name.title(),
          },
        }),
      };

      neo4jService.read = jest.fn().mockResolvedValueOnce({
        records: [songRecord],
      });

      // when
      const result = songQueryService.getAllSong();

      // then
      await expect(result).resolves.toBeTruthy();
    });
  });
});
