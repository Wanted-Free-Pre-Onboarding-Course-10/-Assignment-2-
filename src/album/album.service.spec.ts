import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import { Neo4jService } from '../neo4j/neo4j.service';
import * as faker from 'faker';

const mockNeo4jService = {
  read: jest.fn(),
};

jest.mock('neo4j-driver');
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

  describe('getAllAlbum', () => {
    it('특별한 오류가 없다면 Neo4j에 있는 모든 Album을 반환해야한다', async () => {
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
  });
});
