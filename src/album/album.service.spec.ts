import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import { Neo4jService } from '../neo4j/neo4j.service';

const mockNeo4jService = {};
describe('AlbumService', () => {
  let service: AlbumService;
  let neo4jService: Neo4jService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumService,
        {
          provide: Neo4jService,
          useValue: mockNeo4jService,
        },
      ],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    neo4jService = module.get<Neo4jService>(Neo4jService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(neo4jService).toBeDefined();
  });
});
