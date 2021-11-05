import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Song {
  @Field()
  id!: string;

  @Field()
  name: string;
}
