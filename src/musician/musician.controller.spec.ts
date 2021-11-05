import { Test, TestingModule } from '@nestjs/testing';
import { MusicianController } from './musician.controller';
import { MusicianService } from './musician.service';

const mockMusicianService = {};
describe('MusicianController', () => {
  let controller: MusicianController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicianController],
      providers: [
        {
          provide: MusicianService,
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
