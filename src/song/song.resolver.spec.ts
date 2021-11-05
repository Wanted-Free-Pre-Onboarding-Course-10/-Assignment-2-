import { Test, TestingModule } from "@nestjs/testing";
import { SongResolver } from "./song.resolver";
import { SongQueryService } from "./song.query.service";

const mockSongQueryService = {};
describe("SongResolver", () => {
  let resolver: SongResolver;
  let songQueryService: SongQueryService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongResolver,
        {
          provide: SongQueryService,
          useValue: mockSongQueryService,
        },
      ],
    }).compile();

    resolver = module.get<SongResolver>(SongResolver);
    songQueryService = module.get<SongQueryService>(SongQueryService);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });

  it("should be defined", () => {
    expect(songQueryService).toBeDefined();
  });
});
