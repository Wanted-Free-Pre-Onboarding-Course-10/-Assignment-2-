import { Injectable } from '@nestjs/common';
import { Neo4jService } from '../neo4j/neo4j.service';
import { Album } from './album.entity';
import { Musician } from '../musician/musician.entity';
import { Song } from '../song/song.entity';
import { ALBUM_TO_SONG, SONG_TO_MUSICIAN } from '../relation/relation';

@Injectable()
export class AlbumService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async getAllAlbum(): Promise<Album[]> {
    const result = await this.neo4jService.read(
      `MATCH
                (album : Album) 
              RETURN n`,
      {},
    );

    return result.records.map((album) => {
      const albumId = album.get('album').properties.albumId;
      const name = album.get('album').properties.name;
      const res: Album = {
        albumId,
        name,
      };
      return res;
    });
  }

  async getMusicianByAlbum(albumId: string): Promise<Musician[]> {
    const result = await this.neo4jService.read(
      `MATCH
                (album:Album {albumId: "${albumId}"})-[:${ALBUM_TO_SONG}]-(song),
                (song)-[:${SONG_TO_MUSICIAN}]-(musician)
              RETURN musician`,
      {},
    );

    return result.records.map((musician) => {
      const res: Musician = {
        musicianId: musician.get('musician').properties.musicianId,
        name: musician.get('musician').properties.name,
      };
      return res;
    });
  }

  async getSongByAlbum(albumId: string) {
    const result = await this.neo4jService.read(
      `MATCH
                (album:Album {albumId: "${albumId}"})-[:${ALBUM_TO_SONG}]-(song)
             RETURN song
            `,
      {},
    );

    return result.records.map((song) => {
      const res: Song = {
        songId: song.get('song').properties.songId,
        title: song.get('song').properties.title,
      };
      return res;
    });
  }
}
