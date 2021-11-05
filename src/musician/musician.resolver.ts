import { Query, Resolver } from "@nestjs/graphql";
import { MusicianQueryService } from "./musician.query.service";
import { Musician } from "./graph.musician.entity";

@Resolver()
export class MusicianResolver {
  constructor(private musicianQueryService: MusicianQueryService) {}

  @Query(() => [Musician])
  async getAllMusician(): Promise<Musician[]> {
    return await this.musicianQueryService.getAllMusician();
  }
}
