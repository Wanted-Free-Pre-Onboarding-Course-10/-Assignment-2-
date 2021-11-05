import { Genre } from './genre.enum';

export class Album{
    name: string;
    releaseDate: number;
    genre: Genre;
    createdAt: Date;
    updatedAt: Date;

    // == album 생성 메서드 == //
    public static createAlbum(name: string, releaseDate: number, genre: Genre){
        const album: Album = new Album();

        album.name = name;
        album.releaseDate = releaseDate;
        album.genre = genre;
        album.createdAt = new Date();
        album.updatedAt = null;

        return album;
    }
}