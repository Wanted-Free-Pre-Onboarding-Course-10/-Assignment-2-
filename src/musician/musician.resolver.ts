import { Args, Query, Resolver } from '@nestjs/graphql';
import { MusicianGraphqlDto } from './dto/graphql.musician.dto';
import { MusicianService } from './musician.service';

@Resolver()
export class MusicianResolver {
  constructor(private musicianService: MusicianService) {}

  // == graphql read == //
  @Query(() => [MusicianGraphqlDto])
  async getMusicianByName(): Promise<MusicianGraphqlDto[]> {
    const result = await this.musicianService.getMusiciansGraphql();

    return result;
  }
}
