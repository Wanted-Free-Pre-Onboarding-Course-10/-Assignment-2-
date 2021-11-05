import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Song {
  @Field()
  songId!: string;

  @Field()
  title: string;
}
