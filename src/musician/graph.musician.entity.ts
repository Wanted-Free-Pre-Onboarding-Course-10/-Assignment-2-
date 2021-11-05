import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Musician {
  @Field()
  id!: string;

  @Field()
  name: string;
}
