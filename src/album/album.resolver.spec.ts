import { Test, TestingModule } from '@nestjs/testing';
import { AlbumResolver } from './album.resolver';
import { AlbumService } from './album.service';

const mockService = {};
describe('AlbumResolver', () => {
  let resolver: AlbumResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumResolver,
        {
          provide: AlbumService,
          useValue: mockService,
        },
      ],
    }).compile();

    resolver = module.get<AlbumResolver>(AlbumResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
