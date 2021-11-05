import { Query, Resolver } from "@nestjs/graphql";
import { Song } from "./graph.song.entity";
import { SongQueryService } from "./song.query.service";

@Resolver()
export class SongResolver {
  constructor(private songQueryService: SongQueryService) {}

  @Query(() => [Song])
  async getAllSong(): Promise<Song[]> {
    return await this.songQueryService.getAllSong();
  }
}
