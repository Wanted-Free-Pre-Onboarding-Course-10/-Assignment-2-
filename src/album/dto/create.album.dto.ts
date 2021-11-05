import { IsEnum, IsNotEmpty, IsNumber, Length } from "class-validator";
import { REQUEST_DTO_GENRE_ENUM_MSG, REQUEST_DTO_NOT_EMPTY_MSG, REQUEST_DTO_NUMBER_MSG } from "../../message/messgae";
import { Genre } from "../genre.enum";

export class CreateAlbumDto {

  @IsNotEmpty({
    message: REQUEST_DTO_NOT_EMPTY_MSG
  })
  name: string;

  @IsNotEmpty({
    message: REQUEST_DTO_NOT_EMPTY_MSG
  })
  @IsNumber({}, {
    message: REQUEST_DTO_NUMBER_MSG
  })
  releaseDate: number;

  @IsEnum(Genre, {
    message: REQUEST_DTO_GENRE_ENUM_MSG
  })
  genre: Genre;
}
//releaseDate에 대한 적당한 벨리데이터를 찾고 싶다