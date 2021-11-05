import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Album {
  @Field()
  albumId!: string;

  @Field()
  name: string;
}
