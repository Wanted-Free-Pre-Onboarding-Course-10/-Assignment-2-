import { Test, TestingModule } from "@nestjs/testing";
import { Neo4jService } from "../neo4j/neo4j.service";
import { SongQueryService } from "./song.query.service";

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
});
