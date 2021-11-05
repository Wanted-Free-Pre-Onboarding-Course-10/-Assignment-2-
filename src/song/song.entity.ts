import { Field, ObjectType } from '@nestjs/graphql';
import { Album } from '../album/album.entity';
import { Musician } from '../musician/musician.service';

@ObjectType()
export class Song {
  @Field()
  songId!: string;

  @Field()
  title: string;
}
