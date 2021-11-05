import { Test, TestingModule } from '@nestjs/testing';
import { MusicianService } from './musician.service';
import { Neo4jService } from '../neo4j/neo4j.service';

const mockNeo4jService = {};
describe('MusicianService', () => {
  let service: MusicianService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MusicianService,
        {
          provide: Neo4jService,
          useValue: mockNeo4jService,
        },
      ],
    }).compile();

    service = module.get<MusicianService>(MusicianService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
