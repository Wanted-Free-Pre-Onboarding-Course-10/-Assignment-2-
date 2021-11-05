import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { Genre } from "../genre.enum";

@ObjectType()
export class AlbumGraphqlDto{
    @Field()
    id: string;

    @Field()
    name: string;
 
    @Field()
    releaseDate: number;
  
    @Field()
    genre: Genre;

}