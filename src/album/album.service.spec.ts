import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import { Neo4jService } from '../neo4j/neo4j.service';

const mockNeo4jService = {};
describe('AlbumService', () => {
  let service: AlbumService;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
