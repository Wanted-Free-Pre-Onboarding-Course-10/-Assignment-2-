import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Album {
  @Field()
  id!: string;

  @Field()
  name: string;
}
