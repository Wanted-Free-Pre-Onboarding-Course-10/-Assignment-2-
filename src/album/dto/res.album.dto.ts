import { Genre } from "../genre.enum";

export class ResponseAlbumDto {
  id: string;
  name: string;
  releaseDate: number;
  genre: Genre;
  createdAt: number;
  updatedAt: number;

  // == reponse dto 생성 메서드 == //
  public static createResponseAlnumDto(album: { id: string, name: string, releaseDate: number, genre: Genre, createdAt: string, updatedAt: string }): ResponseAlbumDto {
    const { id, name, releaseDate, genre, createdAt, updatedAt } = album;

    const responseDto: ResponseAlbumDto = {
      id,
      name,
      releaseDate,
      genre,
      createdAt: Date.parse(createdAt),
      updatedAt: Date.parse(updatedAt)
    }

    return responseDto
  }
}


