import { Field, ObjectType } from '@nestjs/graphql';
import { Song } from '../song/song.entity';

@ObjectType()
export class Musician {
  @Field()
  musicianId!: string;

  @Field()
  name: string;
}
