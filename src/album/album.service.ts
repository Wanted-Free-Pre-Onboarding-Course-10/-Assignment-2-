import { Injectable } from '@nestjs/common';
import { Neo4jService } from '../neo4j/neo4j.service';
import { Album } from './album.entity';
import { Musician } from '../musician/musician.entity';

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
      const res: Album = {
        albumId: album.get('album').properties.albumId,
        name: album.get('album').properties.name,
      };
      return res;
    });
  }

  async getMusicianByAlbum(albumId: string): Promise<Musician[]> {
    const result = await this.neo4jService.read(
      `MATCH
                (album:Album {albumId: "${albumId}"})-[:HAS]-(song),
                (song)-[:BE_CREATED]-(musician)
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
}
