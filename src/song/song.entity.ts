import { Field, ObjectType } from '@nestjs/graphql';
import { Album } from '../album/album.entity';
import { Musician } from '../musician/musician.service';

@ObjectType()
export class Song {
  @Field()
  songId!: string;

  @Field()
  name: string;

  @Field()
  album: Album;

  @Field()
  musicians: Musician[];
}
