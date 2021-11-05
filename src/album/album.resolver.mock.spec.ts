import { Test, TestingModule } from '@nestjs/testing';
import { AlbumQueryResolver } from './album.query.resolver';
import { AlbumQueryService } from './album.query.service';

const mockService = {};
describe('AlbumResolver', () => {
  let resolver: AlbumQueryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumQueryResolver,
        {
          provide: AlbumQueryService,
          useValue: mockService,
        },
      ],
    }).compile();

    resolver = module.get<AlbumQueryResolver>(AlbumQueryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
