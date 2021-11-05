import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MusicianGraphqlDto {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  age: number;
}
