import { Query, Resolver } from '@nestjs/graphql';
import { MusicianGraphqlDto } from './dto/graphql.musician.dto';
import { MusicianQueryService } from './musician.query.service';

@Resolver()
export class MusicianQueryResolver {
  constructor(private musicianService: MusicianQueryService) {}

  // == graphql read == //
  @Query(() => [MusicianGraphqlDto])
  async getMusicianByName(): Promise<MusicianGraphqlDto[]> {
    const result = await this.musicianService.getMusiciansGraphql();

    return result;
  }
}
