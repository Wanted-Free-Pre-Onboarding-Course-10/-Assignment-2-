import { Test, TestingModule } from '@nestjs/testing';
import { Neo4jService } from './neo4j.service';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './neo4j.constants';

const mockNeo4jConfig = {};
const mockNeo4jDriver = {};
describe('Neo4jService', () => {
  let service: Neo4jService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Neo4jService,
        {
          provide: NEO4J_CONFIG,
          useValue: mockNeo4jConfig,
        },
        {
          provide: NEO4J_DRIVER,
          useValue: mockNeo4jDriver,
        },
      ],
    }).compile();

    service = module.get<Neo4jService>(Neo4jService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
