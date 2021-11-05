import { Genre } from "../genre.enum";

export class UpdateAlbumDto{
  
  name?: string;

  releaseDate?: number;

  genre?: Genre;

}