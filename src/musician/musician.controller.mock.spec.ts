import { Test, TestingModule } from '@nestjs/testing';
import { MusicianController } from './musician.controller';
import { MusicianQueryService } from './musician.query.service';

const mockMusicianService = {};
describe('MusicianController', () => {
  let controller: MusicianController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicianController],
      providers: [
        {
          provide: MusicianQueryService,
          useValue: mockMusicianService,
        },
      ],
    }).compile();

    controller = module.get<MusicianController>(MusicianController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
