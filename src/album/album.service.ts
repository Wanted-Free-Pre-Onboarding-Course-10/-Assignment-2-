import { Injectable } from '@nestjs/common';
import { Neo4jService } from '../neo4j/neo4j.service';
import { Album } from './album.entity';

@Injectable()
export class AlbumService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async getAllAlbum(): Promise<Album[]> {
    const result = await this.neo4jService.read(
      `MATCH
                (album : Album) 
              RETURN album`,
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
}
