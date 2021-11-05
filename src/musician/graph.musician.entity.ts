import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Musician {
  @Field()
  musicianId!: string;

  @Field()
  name: string;
}
