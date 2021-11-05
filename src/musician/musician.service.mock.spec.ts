import { Test, TestingModule } from "@nestjs/testing";
import { MusicianQueryService } from "./musician.query.service";
import { Neo4jService } from "../neo4j/neo4j.service";

const mockNeo4jService = {};
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
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should be defined", () => {
    expect(neo4jService).toBeDefined();
  });
});
