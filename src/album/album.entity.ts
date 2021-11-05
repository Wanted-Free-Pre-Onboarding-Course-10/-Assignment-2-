import { Field, ObjectType } from '@nestjs/graphql';
import { Song } from '../song/song.entity';

@ObjectType()
export class Album {
  @Field()
  albumId!: string;

  @Field()
  name: string;

  @Field()
  songs: Song[];
}
